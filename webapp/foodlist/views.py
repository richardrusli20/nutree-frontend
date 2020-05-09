from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.shortcuts import render, redirect, get_object_or_404
from .models import FoodList
from vendor.models import Vendor
from customer.models import Customer
from food.models import Food

from .forms import FoodlistForm

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from custom_decorators import allowed_users

from datetime import date

class FoodListIndex(generic.ListView):
    template_name = "foodlist/index.html"
    def get_queryset(self):
        return FoodList.objects.all()

# Welceme foodlist detail
class FoodListDetail(generic.DetailView):
    model = FoodList
    template_name = "foodlist/detail.html"

    def post(self, request, **kwargs):
        foodlist_pk = self.kwargs['pk']
        foodlist_now = get_object_or_404(FoodList, pk=foodlist_pk)
        today = date.today()

        if(today > foodlist_now.available_date):
            # foodlist is "expired"
            return redirect('foodlist:foodlist-detail', pk=foodlist_pk)

        else:
            # foodlist is available
            chosen_quantity = request.POST['options']
            foodlist_pk = foodlist_pk
            foodlist = get_object_or_404(FoodList, pk=foodlist_pk)
            return redirect('foodlist:foodlist-add-to-bag', pk=foodlist_pk, quantity=chosen_quantity)


    def get_queryset(self):

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            query_set = super(FoodListDetail, self).get_queryset().filter(vendor=vendor_result_pk)

            if not query_set:
                raise Http404
        
        # user is not vendor, return un-filterd query_set
        else:
            query_set = super(FoodListDetail, self).get_queryset()
            
        return query_set

    def get_context_data(self, **kwargs):
        context = super(FoodListDetail, self).get_context_data(**kwargs)

        # first check food information: pk, and vendor_pk
        foodlist_pk = self.kwargs['pk']
        creator_pk = context['object'].vendor.pk

        # then check who are trying to see this food (which user)
        # but only interested if user is vendor
        user_now_username = self.request.user

        # check for available date -> show/hide add-to-bag button
        foodlist_now = get_object_or_404(FoodList, pk=foodlist_pk)
        foodlist_available = False
        today = date.today()

        if(today > foodlist_now.available_date):
            # foodlist is "expired"
            foodlist_available = False

        else:
            # foodlist is available
            foodlist_available = True


        if user_now_username.groups.filter(name='vendor').exists():
            # User who is trying to see this food_detail page is vendor
            # Check the pk of current user
            user_now_pk = self.request.user.pk

            # Now search in Vendor database, and search for vendor who has user_pk of user_now_pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)

            # for now: assuming, on vendor only has a one username
            vendor_result_pk = vendor_result[0].pk
            context['vendor_is_creator'] = 'False'
            context['vendor_pk'] = vendor_result_pk
            
            # check if user now is the creator of this food
            if vendor_result_pk == creator_pk:
                context['vendor_is_creator'] = 'True'
                context['foodlist_available'] = foodlist_available
            else:
                context['vendor_is_creator'] = 'False'
            

        elif user_now_username.groups.filter(name='customer').exists():
            user_now_pk = user_now_username.pk
            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_result_pk = customer_result[0].pk
            context['customer_pk'] = customer_result_pk
            context['foodlist_available'] = foodlist_available
        
        elif user_now_username.groups.filter(name='admin').exists():
            None


        # unlogged in user
        else:
            context['foodlist_available'] = foodlist_available
            None
            
        return context


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class FoodlistUpdate(generic.UpdateView):
    form_class = FoodlistForm
    model = FoodList
    #fields= ['foodlist_name', 'diet_program', 'foods', 'available_date', 'price', 'foodlist_logo']

    def get_queryset(self):

        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            query_set = super(FoodlistUpdate, self).get_queryset().filter(vendor=vendor_result_pk)

            if not query_set:
                raise Http404

        elif user_now_username.groups.filter(name='admin').exists():
            query_set = super(FoodlistUpdate, self).get_queryset()
        
        else:
            raise Http404

        return query_set

    def get_context_data(self, **kwargs):
        context = super(FoodlistUpdate, self).get_context_data(**kwargs)
        
        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk
    
        return context

    def get_form(self, form_class=None, *args, **kwargs):
        
        # first get the pk of current foodlist  
        kwargs = super(FoodlistUpdate, self).get_form_kwargs(*args, **kwargs)
        foodlist_pk = self.kwargs['pk']

        # get the vendor of this foodlist
        foodlist_object = FoodList.objects.get(pk=foodlist_pk)
        vendor_pk = foodlist_object.vendor.pk

        # Filtering foods based on vendor
        form = super(UpdateView, self).get_form(form_class)
        form.fields['foods'].queryset = Food.objects.filter(vendor=vendor_pk)
        return form


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class FoodlistDelete(DeleteView):
    model = FoodList

    def get_queryset(self):

        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            query_set = super(FoodlistDelete, self).get_queryset().filter(vendor=vendor_result_pk)

            if not query_set:
                raise Http40

        elif user_now_username.groups.filter(name='admin').exists():
            query_set = super(FoodlistDelete, self).get_queryset()

        return query_set

    # Override the delete function to delete food Y from vendor X
    # Finally redirect back to the vendor X food page
    def delete(self, request, *args, **kwargs):

        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():

            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk

            foodlist_pk = self.kwargs['pk']
            foodlist_to_delete = Food.objects.filter(id=foodlist_pk)
            foodlist_to_delete.delete()

            return redirect(reverse('vendor:vendor-foodlist-view', kwargs={'pk': vendor_result_pk}))

        elif user_now_username.groups.filter(name='admin').exists():

            foodlist_pk = self.kwargs['pk']
            foodlist_to_delete = Food.objects.filter(id=foodlist_pk)
            foodlist_to_delete.delete()

            return redirect(reverse('adminaccount:vendor-view'))
