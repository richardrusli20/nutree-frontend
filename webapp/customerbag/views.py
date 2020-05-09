from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy, reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages

from .models import CustomerBag
from customer.models import Customer
from foodlist.models import FoodList
from address.models import CustomerAddress

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from custom_decorators import allowed_users

from datetime import date

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'customer']), name='dispatch')
class CustomerBagIndex(generic.ListView):

    template_name = "customer/bag.html"

    def get(self, request, **kwargs):
        
        customer = get_object_or_404(Customer, user=request.user.pk)
        customer_pk = customer.pk

        customer = get_object_or_404(Customer, user=self.request.user.pk)
        customer_bag = CustomerBag.objects.filter(customer=customer)

        # get customer address
        customer_address_qs = CustomerAddress.objects.filter(customer=customer_pk)
        customer_address = customer_address_qs[0]

        grand_total = 0
        if not customer_bag:
            # customer bag is empty
            context = {
                'customer_pk':customer_pk,
                'customer_bag':customer_bag, # empty bag
                'grand_total':grand_total,
                'customer_address':customer_address
            }
            return render(request, CustomerBagIndex.template_name, context)

        else:
            # customer bag Not empty, prepare for checkout
            for item in customer_bag:
                grand_total += (item.quantity * item.foodlist.price)

            context = {
                'customer_pk':customer_pk,
                'customer_bag':customer_bag,
                'grand_total':grand_total,
                'customer_address':customer_address
            }

            return render(request, CustomerBagIndex.template_name, context)
      

    def dispatch(self, request, *args, **kwargs):
        
        customer_visited_page_pk = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='customer').exists():

            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_now_pk = customer_result[0].pk

            if (int(customer_visited_page_pk) != int(customer_now_pk)):
                return redirect(reverse('customer:mybag', kwargs={'pk': customer_now_pk}))

        return super(CustomerBagIndex, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):

        customer_pk = self.kwargs['pk']
        context = super(CustomerBagIndex, self).get_context_data(**kwargs)
        context['customer_pk'] = customer_pk
                
        return context



@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class AddFoodListToBag(generic.DetailView):

    template_name = "foodlist/detail.html"

    def get(self, request, **kwargs):

        foodlist_pk = kwargs['pk']
        foodlist = get_object_or_404(FoodList, pk=foodlist_pk)

        # If user try to add a not-available foodlist from url: /foodlist/2/add-to-bag/3/
        today = date.today()
        if(today > foodlist.available_date):
            # foodlist is "expired"
            messages.info(request, 'Foodlist is not available')
            return redirect('foodlist:foodlist-detail', pk=foodlist_pk)

        else:
            # foodlist is available
            # Add foodlist to bag
            customer = get_object_or_404(Customer, user=request.user.pk)
        
            quantity = int(kwargs['quantity'])
            total_price = quantity * foodlist.price

            # first check if foodlist is existed in customer bag 
            result = CustomerBag.objects.filter(customer=customer, foodlist=foodlist)

            if not result:
                # foodlist is not existed in customer bag
                # add foodlist to customer bag
                item_in_bag, created = CustomerBag.objects.get_or_create(customer=customer, foodlist=foodlist, quantity=quantity, total_price=total_price)
                messages.info(request, 'Foodlist was added')
            else:
                # foodlist is existed in customer bag
                # update the quantity instead
                messages.info(request, 'Bag was updated')
                result.update(quantity=quantity)

            return redirect('foodlist:foodlist-detail', pk=foodlist_pk)
        
    # # success POPUP after add to bag
    # def form_valid(self, form):
    #     self.object = form.save()
    #     return render(self.request, 'base/sucess_popup.html', {'success': self.object})

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class RemoveFoodListFromBag(generic.DetailView):

    template_name = "foodlist/detail.html"

    def get(self, request, **kwargs):
        
        foodlist_pk = kwargs['pk']
        foodlist = get_object_or_404(FoodList, pk=foodlist_pk)

        customer = get_object_or_404(Customer, user=request.user.pk)
        customer_pk = customer.pk

        item_to_be_removed = CustomerBag.objects.filter(customer=customer, foodlist=foodlist)
        remove_item = item_to_be_removed.delete()

        return redirect('customer:mybag', pk=customer_pk)

