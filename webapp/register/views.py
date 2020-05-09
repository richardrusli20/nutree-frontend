from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group

from .forms import CreateUserForm, CreateVendorForm
from custom_decorators import unauthenticated_user, allowed_users, admin_only
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from customer.models import Customer
from address.models import CustomerAddress, VendorAddress
from vendor.models import Vendor



@unauthenticated_user
def registerCustomer(request):

    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST or None)
        if form.is_valid():

            user = form.save()

            # Assign User to Group: customer
            group = Group.objects.get(name='customer')
            user.groups.add(group)
            user.is_active = True
            user.email = form.cleaned_data.get('username')
            user.save()

            # Make Customer object
            customer_name = form.cleaned_data.get('customer_name')
            customer_email = form.cleaned_data.get('username')
            created_customer = Customer(user=user, customer_name=customer_name, customer_email=customer_email)
            created_customer.save()

            # Make CustomerAddress object
            customer_now = Customer.objects.filter(user=user)
            customer = customer_now[0]
            created_customerAddress = CustomerAddress.objects.create(customer=customer)

            messages.success(request, 'succesfully create account for ' + str(user))

            return redirect('login')

    context = {'form':form}
    return render(request, 'register/register_customer.html', context)


@login_required
def registerVendor(request):

    form = CreateVendorForm()

    if request.method == "POST":
        form = CreateVendorForm(request.POST or None)
        if form.is_valid():
            user = form.save()

            # Assign User to Group: vendor
            group = Group.objects.get(name='vendor')
            user.groups.add(group)
            user.is_active = True
            user.email = form.cleaned_data.get('username')
            user.save()

            # Make Vendor object
            vendor_email = form.cleaned_data.get('username')
            vendor_name = form.cleaned_data.get('vendor_name')
            vendor_phone = form.cleaned_data.get('vendor_phone')

            created_vendor = Vendor(user=user, vendor_name=vendor_name, vendor_email=vendor_email, vendor_phone=vendor_phone)
            created_vendor.save()

            # Make VendorAddress object
            vendor_now = Vendor.objects.filter(user=user)
            vendor = vendor_now[0]
            created_vendorAddress = VendorAddress.objects.create(vendor=vendor)

            return redirect('adminaccount:vendor-view')

    context = {'form':form}
    return render(request, 'register/register_vendor.html', context)

