from django.contrib import admin
from .models import Vendor
# Register your models here.

# Register Vendor, Food table in admin site
admin.site.register(Vendor)
