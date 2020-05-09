from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from vendor.models import Vendor
from food.models import Food
from foodlist.models import FoodList
from dietprogram.models import DietProgram
from customer.models import Customer
from order.models import Order
from orderitem.models import OrderItem

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from custom_decorators import allowed_users

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin']), name='dispatch')
class IndexView(generic.ListView):
    template_name = "adminaccount/dashboard.html"

    def get_queryset(self):
        return Vendor.objects.all()

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin']), name='dispatch')
class VendorView(generic.ListView):
    template_name = "adminaccount/admin_vendor.html"

    def get_queryset(self):
        return Vendor.objects.all()


@method_decorator(login_required, name='dispatch')
class VendorUpdate(UpdateView):
    model = Vendor
    fields = ['vendor_name', 'vendor_location', 'vendor_logo']

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin']), name='dispatch')
class VendorDelete(DeleteView):
    model = Vendor
    # After delete Vendor, user will be redirected to index.html of vendor
    success_url = reverse_lazy('adminaccount:vendor-view')

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin']), name='dispatch')
class DietProgramView(generic.ListView):
    template_name = "adminaccount/admin_dietprogram.html"

    def get_queryset(self):
        return DietProgram.objects.all()

@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin']), name='dispatch')
class DietProgramAdd(CreateView):
    model = DietProgram
    fields= ['dietProgram_name', 'description', 'dietProgram_logo']


    def get_form(self, form_class=None, *args, **kwargs):

        form = super(CreateView, self).get_form(form_class)
        return form


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin']), name='dispatch')
class CustomerView(generic.ListView):
    template_name = "adminaccount/admin_customer.html"

    def get_queryset(self):
        return Customer.objects.all()


@method_decorator(login_required, name='dispatch')
@method_decorator(allowed_users(allowed_roles=['admin', 'vendor']), name='dispatch')
class OrderView(generic.ListView):
    template_name = "adminaccount/order.html"

    def get_queryset(self):

        order_list = Order.objects.all()

        return order_list
        