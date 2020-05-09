from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.http import Http404
from .models import Food
from vendor.models import Vendor
from customer.models import Customer
from django.shortcuts import redirect
from django.urls import reverse


from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from custom_decorators import allowed_users

#@method_decorator(login_required, name='dispatch')
class FoodDetailView(generic.DetailView):
    model = Food
    template_name = "food/detail.html"

    # get_queryset: used for query the object based on pk
    # so only creator of this food and admin and customer could the only one who can see this food
    def get_queryset(self):

        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            query_set = super(FoodDetailView, self).get_queryset().filter(vendor=vendor_result_pk)

            if not query_set:
                raise Http404
        
        # user is not vendor, return un-filterd query_set
        else:
            query_set = super(FoodDetailView, self).get_queryset()
            
        return query_set


    def get_context_data(self, **kwargs):
        context = super(FoodDetailView, self).get_context_data(**kwargs)

        # first check food information: pk, and vendor_pk
        food_pk = self.kwargs['pk']
        creator_pk = context['object'].vendor.pk

        # then check who are trying to see this food (which user)
        # but only interested if user is vendor
        user_now_username = self.request.user

        if user_now_username.groups.filter(name='vendor').exists():
            # User who is trying to see this food_detail page is vendor
            # Check the pk of current user
            user_now_pk = self.request.user.pk
            #print("User " + str(user_now_username) + "_pk: " +str(user_now_pk))

            # Now search in Vendor database, and search for vendor who has user_pk of user_now_pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)

            # for now: assuming, on vendor only has a one username
            vendor_result_pk = vendor_result[0].pk
            context['vendor_is_creator'] = 'False'
            context['vendor_pk'] = vendor_result_pk
            
            # check if user now is the creator of this food
            if vendor_result_pk == creator_pk:
                #print("User " + str(user_now_username) + " is creator of this food")
                context['vendor_is_creator'] = 'True'
            else:
                #print("User " + str(user_now_username) + " is NOT creator of this food")
                context['vendor_is_creator'] = 'False'

        elif user_now_username.groups.filter(name='customer').exists():
            context = super(FoodDetailView, self).get_context_data(**kwargs)

            user_now_username = self.request.user

            if user_now_username.groups.filter(name='customer').exists():
                    user_now_pk = user_now_username.pk
                    customer_result = Customer.objects.filter(user=user_now_pk)
                    customer_result_pk = customer_result[0].pk
                    context['customer_pk'] = customer_result_pk
                    
            return context              
            
        return context

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class FoodUpdate(generic.UpdateView):
    model = Food
    fields= ['food_name', 'calories', 'description', 'food_photo']
    template_name = "food/food_form.html"

    # get_queryset: used for query the object based on pk
    # so only creator of this food and admin and customer could the only one who can see this food
    def get_queryset(self):

        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            query_set = super(FoodUpdate, self).get_queryset().filter(vendor=vendor_result_pk)

            if not query_set:
                raise Http404

        elif user_now_username.groups.filter(name='admin').exists():
            print("user is admin")
            query_set = super(FoodUpdate, self).get_queryset()
        
        else:
            raise Http404

        return query_set

    def get_context_data(self, **kwargs):
        context = super(FoodUpdate, self).get_context_data(**kwargs)
        
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
class FoodDelete(DeleteView):
    model = Food

    def get_queryset(self):

        user_now_username = self.request.user

        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = self.request.user.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            query_set = super(FoodDelete, self).get_queryset().filter(vendor=vendor_result_pk)

            if not query_set:
                raise Http404

        elif user_now_username.groups.filter(name='admin').exists():
            query_set = super(FoodDelete, self).get_queryset()

        return query_set


    # Override the delete function to delete food Y from vendor X
    # Finally redirect back to the vendor X food page
    def delete(self, request, *args, **kwargs):

        user_now_username = self.request.user


        # if user is vendor, then filter query_set
        if user_now_username.groups.filter(name='vendor').exists():
            user_now_pk = user_now_username.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk

            food_pk = self.kwargs['pk']
            food_to_delete = Food.objects.filter(id=food_pk)
            food_to_delete.delete()

            return redirect(reverse('vendor:vendor-food-view', kwargs={'pk': vendor_result_pk}))

        elif user_now_username.groups.filter(name='admin').exists():

            food_pk = self.kwargs['pk']
            food_to_delete = Food.objects.filter(id=food_pk)
            food_to_delete.delete()

            return redirect(reverse('adminaccount:vendor-view'))

        

    
