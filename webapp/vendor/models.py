from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse

#from address.models import VendorAddress

class Vendor(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    vendor_name = models.CharField(max_length=100)
    vendor_email = models.CharField(max_length=100)
    vendor_phone = models.CharField(blank=True, max_length=100)
    vendor_logo = models.CharField(max_length=1000, blank=True)

    # # after adding a new vendor, the user will be redirected to the detail view of vendor 
    def get_absolute_url(self):
        return reverse('vendor:vendor-profile', kwargs={'pk': self.pk})

    def __str__(self):
        return str(self.user) + ' - ' + self.vendor_name
