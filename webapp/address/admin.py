from django.contrib import admin
from .models import CustomerAddress, VendorAddress

# Register your models here.
admin.site.register(CustomerAddress)
admin.site.register(VendorAddress)
