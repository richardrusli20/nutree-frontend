from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.auth.views import PasswordChangeView, PasswordChangeDoneView
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.http import Http404

from django.forms.widgets import SelectDateWidget, EmailInput 

from .models import Vendor
from food.models import Food
from foodlist.models import FoodList
from orderitem.models import OrderItem

from custom_decorators import allowed_users

from foodlist.forms import FoodlistForm


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class DetailView(generic.DetailView):
    model = Vendor
    template_name = "vendor/index.html"

    def get_context_data(self, **kwargs):
        context = super(DetailView, self).get_context_data(**kwargs)

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='vendor').exists():

            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)

            # for now: assuming, on vendor only has a one username
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk

        elif user_now_username.groups.filter(name='admin').exists():
            vendor_owner_pk = kwargs['object'].pk
            context['vendor_pk'] = vendor_owner_pk

        return context

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class SettingView(generic.DetailView):
    model = Vendor
    template_name = "vendor/setting.html"

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class VendorProfileView(generic.DetailView):
    model = Vendor
    template_name = "vendor/profile.html"

    def post(self, request, **kwargs):
        user_request = request.POST['button_val']
        vendor_pk = self.kwargs['pk']

        if user_request == "change-email":
            return redirect('vendor:vendor-profile', pk=vendor_pk)
            #return redirect('vendor:email-change', pk=vendor_pk)

        elif user_request == "change-password":
            return redirect('vendor:password-change', pk=vendor_pk)

        elif user_request == "delete-account":
            return redirect('vendor:vendor-profile', pk=vendor_pk)
            #return redirect('customer:delete-account-confirmation', pk=vendor_pk)

    def dispatch(self, request, *args, **kwargs):
        
        vendor_food_to_add = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_now_pk = vendor_result[0].pk

            if (int(vendor_food_to_add) != int(vendor_now_pk)):
                return redirect(reverse('vendor:vendor-food-view', kwargs={'pk': vendor_now_pk}))
        
        return super(VendorProfileView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(VendorProfileView, self).get_context_data(**kwargs)
        
        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk
    
        return context

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class VendorProfileUpdate(UpdateView):
    model = Vendor
    fields = ['vendor_name', 'vendor_email', 'vendor_phone', 'vendor_logo']

    def get_context_data(self, **kwargs):

        vendor_pk = self.kwargs['pk']
        context = super(VendorProfileUpdate, self).get_context_data(**kwargs)
        context['vendor_pk'] = vendor_pk
                
        return context

# Vendor - Food section
@method_decorator(login_required, name='dispatch')
class VendorFoodView(generic.DetailView):
    model = Vendor
    template_name = "vendor/food.html"

    # used to check if logged-in user now is vendor, and also the creator/owner of visited food page
    # restrict via url
    def dispatch(self, request, *args, **kwargs):
        
        vendor_food_to_add = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_now_pk = vendor_result[0].pk

            if (int(vendor_food_to_add) != int(vendor_now_pk)):
                return redirect(reverse('vendor:vendor-food-view', kwargs={'pk': vendor_now_pk}))
        
        return super(VendorFoodView, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):

        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            query_set = super(VendorFoodView, self).get_queryset().filter(id=vendor_result_pk)
        else:
            query_set = super(VendorFoodView, self).get_queryset()
            
        return query_set
    

    def get_context_data(self, **kwargs):
        context = super(VendorFoodView, self).get_context_data(**kwargs)

        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)

            # for now: assuming, on vendor only has a one username
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk
            
        return context


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class VendorFoodAdd(CreateView):
    model = Food
    fields= ['food_name', 'calories', 'description', 'food_photo']

    def __init__(self, *args, **kwargs):
        self.location_pk = kwargs.pop('pk', None)
        super().__init__(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(VendorFoodAdd, self).get_context_data(**kwargs)
        
        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk
    
        return context
    
    def get_form(self, form_class=None, *args, **kwargs):

        kwargs = super(VendorFoodAdd, self).get_form_kwargs(*args, **kwargs)
        vendor_food_to_add = self.kwargs['pk']

        user_now_username = self.request.user
        user_now_pk = user_now_username.pk
        form = super(CreateView, self).get_form(form_class)

        return form


    # func: dispatch
    # used to check if logged-in user now is vendor, and also the creator/owner of visited food page
    # restrict via url
    def dispatch(self, request, *args, **kwargs):
        
        vendor_food_to_add = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_now_pk = vendor_result[0].pk

            if (int(vendor_food_to_add) != int(vendor_now_pk)):
                return redirect(reverse('vendor:vendor-food-view', kwargs={'pk': vendor_now_pk}))
            
        return super(VendorFoodAdd, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form, *args, **kwargs):

        vendor_pk = int(self.kwargs['pk'])
        vendor_obj = Vendor.objects.get(pk=vendor_pk)
        form.instance.vendor = vendor_obj

        return super().form_valid(form)

# --------------------------------------------------------------------



# Vendor - Foodlist section
@method_decorator(login_required, name='dispatch')
class VendorFoodlistView(generic.DetailView):
    model = Vendor
    template_name = "vendor/foodlist.html"

    # used to check if logged-in user now is vendor, and also the creator/owner of visited food page
    # restrict via url
    def dispatch(self, request, *args, **kwargs):
        
        vendor_foodlist_to_add = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_now_pk = vendor_result[0].pk

            if (int(vendor_foodlist_to_add) != int(vendor_now_pk)):
                return redirect(reverse('vendor:vendor-foodlist-view', kwargs={'pk': vendor_now_pk}))
        
        return super(VendorFoodlistView, self).dispatch(request, *args, **kwargs)
    
    def get_queryset(self):

        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            query_set = super(VendorFoodlistView, self).get_queryset().filter(id=vendor_result_pk)

            if not query_set:
                raise Http404
        
        # user is not vendor, return un-filterd query_set
        else:
            query_set = super(VendorFoodlistView, self).get_queryset()
            
        return query_set

    def get_context_data(self, **kwargs):
        context = super(VendorFoodlistView, self).get_context_data(**kwargs)

        user_now_username = self.request.user
        user_now_pk = user_now_username.pk
        owner_pk = context['object'].pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk

            
        return context

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class VendorFoodlistAdd(CreateView):
    model = FoodList
    form_class = FoodlistForm

    def get_context_data(self, **kwargs):
        context = super(VendorFoodlistAdd, self).get_context_data(**kwargs)
        
        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk
    
        return context


    def get_form(self, form_class=None, *args, **kwargs):

        kwargs = super(VendorFoodlistAdd, self).get_form_kwargs(*args, **kwargs)
        creator_pk = self.kwargs['pk']
        form = super(CreateView, self).get_form(form_class)
        form.fields['foods'].queryset = Food.objects.filter(vendor=creator_pk)

        return form


    def dispatch(self, request, *args, **kwargs):
        
        vendor_foodlist_to_add = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_now_pk = vendor_result[0].pk

            if (int(vendor_foodlist_to_add) != int(vendor_now_pk)):
                return redirect(reverse('vendor:vendor-foodlist-view', kwargs={'pk': vendor_now_pk}))

        return super(VendorFoodlistAdd, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form, *args, **kwargs):
        
        vendor_pk = int(self.kwargs['pk'])
        vendor_obj = Vendor.objects.get(pk=vendor_pk)
        form.instance.vendor = vendor_obj

        return super().form_valid(form)


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class VendorOrderView(generic.ListView):

    template_name = "vendor/order.html"

    def get_queryset(self):

        user_now_username = self.request.user
        user_now_pk = user_now_username.pk
        vendor_result = Vendor.objects.filter(user=user_now_pk)
        vendor_pk = vendor_result[0].pk
   
        orderitem_list = OrderItem.objects.filter(vendor=vendor_pk)

        return orderitem_list


    def dispatch(self, request, *args, **kwargs):
        
        vendor_food_to_add = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_now_pk = vendor_result[0].pk

            if (int(vendor_food_to_add) != int(vendor_now_pk)):
                return redirect(reverse('vendor:vendor-food-view', kwargs={'pk': vendor_now_pk}))
            
        return super(VendorOrderView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):

        vendor_pk = self.kwargs['pk']
        context = super(VendorOrderView, self).get_context_data(**kwargs)
        context['vendor_pk'] = vendor_pk
                
        return context


# --------------------------------------------------------------------



# Vendor - Account section

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['vendor']), name='dispatch')
class ChangePassword(PasswordChangeView):

    template_name = 'customer/password_change.html'

    def dispatch(self, request, *args, **kwargs):
        
        vendor_food_to_add = kwargs['pk']
        user_now_username = self.request.user
        user_now_pk = user_now_username.pk

        if user_now_username.groups.filter(name='vendor').exists():

            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_now_pk = vendor_result[0].pk

            if (int(vendor_food_to_add) != int(vendor_now_pk)):
                return redirect(reverse('vendor:vendor-food-view', kwargs={'pk': vendor_now_pk}))
            
        return super(ChangePassword, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):

        vendor_pk = self.kwargs['pk']
        context = super(ChangePassword, self).get_context_data(**kwargs)
        context['vendor_pk'] = vendor_pk
                
        return context

    # override the success url
    def get_success_url(self):
        vendor_pk = self.kwargs['pk']
        return reverse('vendor:password-change-done', kwargs={'pk': vendor_pk})


class ChangePasswordDone(PasswordChangeDoneView):

    #template_name = 'customer/password_change_done.html'
    None
    # here pass a success message to template
    # see: https://docs.djangoproject.com/en/3.0/topics/auth/default/#django.contrib.auth.views.PasswordChangeDoneView
