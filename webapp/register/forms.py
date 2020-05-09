from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


class CreateUserForm(UserCreationForm):

    customer_name = forms.CharField(max_length=100)

    class Meta:
        model = User
        #fields = ['username', 'customer_name', 'customer_location', 'customer_email', 'password1', 'password2']
        fields = ['customer_name', 'username', 'password1', 'password2']


class CreateVendorForm(UserCreationForm):

    vendor_name = forms.CharField(max_length=100)
    vendor_phone = forms.CharField(max_length=100)
    # vendor_logo = forms.CharField(max_length=1000)

    class Meta:
        model = User
        fields = ['vendor_name', 'vendor_phone', 'username', 'password1', 'password2']
