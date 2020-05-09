from django.db import models
from django.urls import reverse

from customer.models import Customer
from vendor.models import Vendor


class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    street = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=5, blank=True)
    city = models.CharField(max_length=100, blank=True)
    province = models.CharField(max_length=100, blank=True)

    def get_absolute_url(self):
        return reverse('customer:address', kwargs={'pk': self.pk})

    def __str__(self):
        return str(self.customer) + ' ; ' + self.street + ' ; ' + str(self.postal_code) + ' ; ' + self.city


class VendorAddress(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    street = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=5, blank=True)
    city = models.CharField(max_length=100, blank=True)
    province = models.CharField(max_length=100, blank=True)

    def get_absolute_url(self):
        return reverse('vendor:vendor-profile', kwargs={'pk': self.pk})

    def __str__(self):
        return str(self.vendor) + ' ; ' + self.street + ' ; ' + str(self.postal_code) + ' ; ' + self.city
