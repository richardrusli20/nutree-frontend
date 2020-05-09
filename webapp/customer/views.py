from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.auth.views import PasswordChangeView, PasswordChangeDoneView
from django.contrib.auth.views import PasswordResetView,  PasswordResetDoneView 
from django.contrib.auth.views import PasswordResetConfirmView, PasswordResetCompleteView
from django.contrib.auth.models import User, Group
from django.urls import reverse_lazy, reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.core.paginator import Paginator
from django.http import Http404
from django.contrib.auth.hashers import check_password
from django.contrib.auth import logout
from django.contrib import messages


from customer.models import Customer
from address.models import CustomerAddress
from customerbag.models import CustomerBag
from order.models import Order
from orderitem.models import OrderItem
from login.views import logoutUser

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from custom_decorators import allowed_users

import midtransclient

import datetime

# redirect if url: /customer/2/
def redirect_to_profile(request, pk):
    return redirect(reverse('customer:profile', kwargs={'pk': pk}))


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'customer']), name='dispatch')
class ProfileView(generic.DetailView):
    model = Customer
    template_name = "customer/profile.html"

    def post(self, request, **kwargs):
        user_request = request.POST['button_val']
        customer_pk = self.kwargs['pk']

        if user_request == "change-password":
            return redirect('customer:password-change', pk=customer_pk)

        elif user_request == "delete-account":
            return redirect('customer:delete-account-confirmation', pk=customer_pk)

    def dispatch(self, request, *args, **kwargs):
        
        customer_visited_page_pk = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='customer').exists():

            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_now_pk = customer_result[0].pk

            if (int(customer_visited_page_pk) != int(customer_now_pk)):
                return redirect(reverse('customer:profile', kwargs={'pk': customer_now_pk}))

        return super(ProfileView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ProfileView, self).get_context_data(**kwargs)

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='customer').exists():
            user_now_pk = user_now_username.pk
            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_result_pk = customer_result[0].pk
            context['customer_pk'] = customer_result_pk
                
        return context



@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'customer']), name='dispatch')
class ProfileUpdate(UpdateView):
    model = Customer
    fields = ['customer_name', 'customer_phone', 'customer_email']

    def get_context_data(self, **kwargs):

        customer_pk = self.kwargs['pk']
        context = super(ProfileUpdate, self).get_context_data(**kwargs)
        context['customer_pk'] = customer_pk
                
        return context

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'customer']), name='dispatch')
class AddressView(generic.DetailView):
    model = Customer
    template_name = "customer/address.html"

    def dispatch(self, request, *args, **kwargs):
        
        customer_visited_page_pk = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='customer').exists():

            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_now_pk = customer_result[0].pk

            if (int(customer_visited_page_pk) != int(customer_now_pk)):
                return redirect(reverse('customer:profile', kwargs={'pk': customer_now_pk}))

        return super(AddressView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(AddressView, self).get_context_data(**kwargs)

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='customer').exists():
            user_now_pk = user_now_username.pk
            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_result_pk = customer_result[0].pk
            context['customer_pk'] = customer_result_pk
                
        return context

    def get_queryset(self):

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='customer').exists():
            user_now_pk = self.request.user.pk
            customer_result = Customer.objects.filter(user=user_now_pk)
            customer = customer_result[0]
            customer_pk = customer.pk

            query_set = super(AddressView, self).get_queryset().filter(user=user_now_pk)
            #address_qs = CustomerAddress.objects.filter(customer=customer_pk)

        # elif user_now_username.groups.filter(name='admin').exists():
        #     print("user is admin")
        #     query_set = super(AddressView, self).get_queryset()

        return query_set

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'customer']), name='dispatch')
class AddressUpdate(UpdateView):
    model = CustomerAddress
    fields = ['street', 'postal_code', 'city', 'province']
    template_name = 'address/address_form.html'
    
    def get_context_data(self, **kwargs):

        customer_pk = self.kwargs['pk']
        context = super(AddressUpdate, self).get_context_data(**kwargs)
        context['customer_pk'] = customer_pk
        
        return context

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class ChangePassword(PasswordChangeView):

    template_name = 'customer/password_change.html'

    def dispatch(self, request, *args, **kwargs):
        
        customer_visited_page_pk = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='customer').exists():

            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_now_pk = customer_result[0].pk

            if (int(customer_visited_page_pk) != int(customer_now_pk)):
                return redirect(reverse('customer:password-change', kwargs={'pk': customer_now_pk}))

        return super(ChangePassword, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ChangePassword, self).get_context_data(**kwargs)

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='customer').exists():
                user_now_pk = user_now_username.pk
                customer_result = Customer.objects.filter(user=user_now_pk)
                customer_result_pk = customer_result[0].pk
                context['customer_pk'] = customer_result_pk
                
        return context

    # override the success url
    def get_success_url(self):
        customer_pk = self.kwargs['pk']
        return reverse('customer:password-change-done', kwargs={'pk': customer_pk})


class ChangePasswordDone(PasswordChangeDoneView):

    #template_name = 'customer/password_change_done.html'
    None
    # here pass a success message to template
    # see: https://docs.djangoproject.com/en/3.0/topics/auth/default/#django.contrib.auth.views.PasswordChangeDoneView


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class DeleteAccountConfirmation(generic.DetailView):
    model = Customer
    template_name = "customer/delete_confirmation.html"

    def post(self, request, **kwargs):

        customer_pk = self.kwargs['pk']
        user_qs = User.objects.filter(username=request.user)

        # Check password
        success = (request.user).check_password(request.POST['entered_password'])

        if success:
            # entered_password is correct
            # Logout user first
            logout(request)

            # Remove User object
            user_qs.delete()

            return redirect('welcome:index')

        else:
            # entered_password is wrong
            messages.info(request, 'Entered password is wrong')
            return redirect('customer:delete-account-confirmation', pk=customer_pk)


    def dispatch(self, request, *args, **kwargs):
        
        customer_visited_page_pk = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='customer').exists():

            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_now_pk = customer_result[0].pk

            if (int(customer_visited_page_pk) != int(customer_now_pk)):
                return redirect(reverse('customer:profile', kwargs={'pk': customer_now_pk}))

        return super(DeleteAccountConfirmation, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(DeleteAccountConfirmation, self).get_context_data(**kwargs)

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='customer').exists():
            user_now_pk = user_now_username.pk
            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_result_pk = customer_result[0].pk
            context['customer_pk'] = customer_result_pk
                
        return context


######## CHECKOUT - PAY - ORDER HISTORY ######## 

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class CustomerCheckout(generic.DetailView):

    template_name="customer/checkout.html"
    
    def get(self, request, **kwargs):
        
        customer = get_object_or_404(Customer, user=request.user.pk)
        customer_pk = customer.pk

        customer = get_object_or_404(Customer, user=self.request.user.pk)
        customer_bag = CustomerBag.objects.filter(customer=customer)

        grand_total = 0
        sub_total = 0
        if not customer_bag:
            # customer bag is empty
            return redirect('customer:mybag', pk=customer_pk)
        else:
            # customer bag Not empty, proceed to checkout
            for item in customer_bag:
                sub_total += (item.quantity * item.foodlist.price)
            
            # get customer address
            customer_address = CustomerAddress.objects.filter(customer=customer_pk)
            
            # dummy delivery cost
            delivery_cost = 10000

            grand_total = sub_total + delivery_cost




        # initialize snap client object
        snap = midtransclient.Snap(
            is_production=False,
            server_key='SB-Mid-server-NykCy8VAHddlpCN7jgtUXsX9',
            client_key='SB-Mid-client-aEfMPn-EmK9mswDN'
        )

        # prepare SNAP API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example
        param = {
            "transaction_details": {
                "order_id": "test-transaction-123",
                "gross_amount": 200000
            }, "credit_card":{
                "secure" : True
            }
        }

        # create transaction
        transaction = snap.create_transaction(param)

        # transaction token
        transaction_token = transaction['token']
        print('transaction_token:')
        print(transaction_token)

        # transaction redirect url
        transaction_redirect_url = transaction['redirect_url']
        print('transaction_redirect_url:')
        print(transaction_redirect_url)
        

        context = {
            'customer_pk':customer_pk,
            'customer_bag':customer_bag,
            'sub_total':sub_total,
            'delivery_cost': delivery_cost,
            'grand_total':grand_total,
            'customer_address':customer_address,
            'transaction_token':transaction_token
        }

        # transaction is dictionary representation of API JSON response
        # sample:
        # {
        #   'redirect_url': 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f0a2cbe7-dfb7-4114-88b9-1ecd89e90121', 
        #   'token': 'f0a2cbe7-dfb7-4114-88b9-1ecd89e90121'
        # }
        

        return render(request, CustomerCheckout.template_name, context)
    
        


    def get_context_data(self, **kwargs):

        customer_pk = self.kwargs['pk']
        context = super(CustomerPay, self).get_context_data(**kwargs)
        context['customer_pk'] = customer_pk
                
        return context

    def dispatch(self, request, *args, **kwargs):
        
        customer_visited_page_pk = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='customer').exists():

            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_now_pk = customer_result[0].pk
        
            if (int(customer_visited_page_pk) != int(customer_now_pk)):
                return redirect(reverse('customer:pay', kwargs={'pk': customer_now_pk}))

        return super(CustomerCheckout, self).dispatch(request, *args, **kwargs)




@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class CustomerPay(generic.DetailView):

    def get(self, request, **kwargs):
        
        customer = get_object_or_404(Customer, user=request.user.pk)
        customer_pk = customer.pk

        # first get item from customer bag
        customer_bag = CustomerBag.objects.filter(customer=customer)

        grand_total = 0

        # Try to add different route to credit card payment and bank transfer page
        # if request.method == 'POST':
        #     form = CustomerPay(request.POST)
        #     if form.is_valid():
        #         print('------------')
        #         print('form')
        #         print('------------')

        if not customer_bag:
            # customer bag is empty
            return redirect('customer:mybag', pk=customer_pk)
        else:
                
            # prototype:
            PAYMENT_STATUS = False

            if PAYMENT_STATUS:
                # PAYMENT SUCCESS 
                # First create an Order
                date = datetime.date.today()
                order = Order.objects.create(customer=customer, order_date=date, payment_type="debit", grand_total=0)
                order_id = order.pk
                
                # Then, create order items
                for goods in customer_bag:
                    customer = goods.customer
                    foodlist=goods.foodlist
                    vendor = goods.foodlist.vendor
                    quantity = goods.quantity
                    total_price = goods.total_price

                    # create order item
                    order_item = OrderItem.objects.create(order_id=order_id, customer=customer, foodlist=foodlist, vendor=vendor, quantity=quantity, total_price=total_price)

                    grand_total += goods.total_price

                # Get order items based on order_id
                order_items = OrderItem.objects.filter(order_id=order_id)

                # add item into Order 
                for item in order_items:
                    order.item.add(item)

                # update grand total in Order
                Order.objects.filter(pk=order_id).update(grand_total=grand_total)

                # remove items from customer bag
                item_to_be_removed = CustomerBag.objects.filter(customer=customer)
                remove_item = item_to_be_removed.delete()

                return redirect('customer:payment-success', pk=customer_pk)

            else:
                # Payment Failed
                # return redirect('customer:payment-failed', pk=customer_pk)

                # payment using Credit Card
                return redirect('customer:credit-card', pk=customer_pk)


    def get_queryset(self):
        customer = get_object_or_404(Customer, user=self.request.user.pk)
        customer_bag = CustomerBag.objects.filter(customer=customer)

        return customer_bag

    def get_context_data(self, **kwargs):

        customer_pk = self.kwargs['pk']
        context = super(CustomerPay, self).get_context_data(**kwargs)
        context['customer_pk'] = customer_pk
                
        return context

    def dispatch(self, request, *args, **kwargs):
        
        customer_visited_page_pk = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='customer').exists():

            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_now_pk = customer_result[0].pk

            if (int(customer_visited_page_pk) != int(customer_now_pk)):
                return redirect(reverse('customer:pay', kwargs={'pk': customer_now_pk}))

        return super(CustomerPay, self).dispatch(request, *args, **kwargs)


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class PaymentSuccess(generic.DetailView):
    template_name = 'customer/payment_success.html'

    def get(self, request, **kwargs):
        
        customer = get_object_or_404(Customer, user=self.request.user.pk)
        customer_pk = customer.pk

        return render(request, PaymentSuccess.template_name, {'customer_pk':customer_pk})


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class PaymentFailed(generic.DetailView):
    template_name = 'customer/payment_failed.html'

    def get(self, request, **kwargs):
        
        customer = get_object_or_404(Customer, user=self.request.user.pk)
        customer_pk = customer.pk

        return render(request, PaymentFailed.template_name, {'customer_pk':customer_pk})
    
@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['customer']), name='dispatch')
class CreditCard(generic.DetailView):
    template_name = 'payment/creditcard.html'

    def get(self, request, **kwargs):
        
        customer = get_object_or_404(Customer, user=self.request.user.pk)
        customer_pk = customer.pk

        return render(request, CreditCard.template_name, {'customer_pk':customer_pk})


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'customer']), name='dispatch')
class OrderHistory(generic.ListView):
    paginate_by = 5
    model = Order
    template_name = "customer/order_history.html"

    def get_queryset(self):
        customer = get_object_or_404(Customer, user=self.request.user.pk)
        customer_order = Order.objects.filter(customer=customer)

        return customer_order

    def dispatch(self, request, *args, **kwargs):
        
        customer_visited_page_pk = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='customer').exists():

            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_now_pk = customer_result[0].pk

            if (int(customer_visited_page_pk) != int(customer_now_pk)):
                return redirect(reverse('customer:order-history', kwargs={'pk': customer_now_pk}))

        return super(OrderHistory, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(OrderHistory, self).get_context_data(**kwargs)

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='customer').exists():
                user_now_pk = user_now_username.pk
                customer_result = Customer.objects.filter(user=user_now_pk)
                customer_result_pk = customer_result[0].pk
                context['customer_pk'] = customer_result_pk
                
        return context
