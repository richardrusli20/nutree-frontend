from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from custom_decorators import unauthenticated_user
from django.contrib.auth.models import User, Group
from django.urls import reverse
from customer.models import Customer
from vendor.models import Vendor

#@unauthenticated_user
def loginPage(request):

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:

            username_pk = (User.objects.get(username=username)).pk

            login(request, user)

            if user.groups.filter(name='admin').exists():
                return redirect('adminaccount:index')

            if user.groups.filter(name='vendor').exists():
                vendor_pk = (Vendor.objects.get(user_id=username_pk)).pk
                return redirect(reverse('vendor:index' , kwargs={'pk':vendor_pk}))

            if user.groups.filter(name='customer').exists():
                customer_pk = (Customer.objects.get(user_id=username_pk)).pk
                return redirect('welcome:index')
                #return redirect(request.GET.get('next'))
                
        else:
            messages.info(request, 'Username or password is incorrect')

    context = {}
    return render(request, 'login/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('welcome:index')
