from django.views import generic
from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from .models import DietProgram
from foodlist.models import FoodList
from vendor.models import Vendor
from customer.models import Customer

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from custom_decorators import allowed_users

from datetime import date

class IndexView(generic.ListView):
    template_name = "dietprogram/index.html"

    def get_queryset(self):
        return DietProgram.objects.all()

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='vendor').exists():

            user_now_pk = user_now_username.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk

        elif user_now_username.groups.filter(name='customer').exists():
            user_now_pk = user_now_username.pk
            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_result_pk = customer_result[0].pk
            context['customer_pk'] = customer_result_pk
            
        return context

def detail(request, dietprogram_id):

    dietProgram = get_object_or_404(DietProgram, pk=dietprogram_id)
    user_now_username = request.user

    foodlist_qs = dietProgram.foodlist_set.all()

    # Filter foodlist based on available date
    # Filter older available date 
    foodlist_qs = dietProgram.foodlist_set.all()
    today = date.today()
    # https://docs.djangoproject.com/en/dev/ref/models/querysets/#gt
    filtered_foodlist = foodlist_qs.filter(available_date__gt=today)


    if user_now_username.groups.filter(name='vendor').exists():

        user_now_pk = user_now_username.pk
        vendor_result = Vendor.objects.filter(user=user_now_pk)
        vendor_result_pk = vendor_result[0].pk
        context = {'dietProgram': dietProgram, 'vendor_pk':vendor_result_pk, 'filtered_foodlist':filtered_foodlist}

    elif user_now_username.groups.filter(name='customer').exists():

        user_now_pk = user_now_username.pk
        customer_result = Customer.objects.filter(user=user_now_pk)
        customer_result_pk = customer_result[0].pk
        context = {'dietProgram': dietProgram, 'customer_pk':customer_result_pk, 'filtered_foodlist':filtered_foodlist}
    else:
        context = {'dietProgram': dietProgram, 'filtered_foodlist':filtered_foodlist}

    return render(request, "dietprogram/detail.html", context)

    
@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin']), name='dispatch')
class DietProgramUpdate(generic.UpdateView):
    model = DietProgram
    fields= ['dietProgram_name', 'description', 'dietProgram_logo']
    template_name = "dietprogram/dietprogram_form.html"


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin']), name='dispatch')
class DietProgramDelete(generic.DeleteView):
    model = DietProgram
    success_url = reverse_lazy('adminaccount:dietprogram-view')
