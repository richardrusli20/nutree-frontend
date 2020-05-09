from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse

#from address.models import CustomerAddress

class Customer(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    customer_name = models.CharField(blank=True, max_length=100)
    customer_email = models.CharField(max_length=100)
    customer_phone = models.CharField(blank=True, max_length=100)

    def get_absolute_url(self):
        return reverse('customer:profile', kwargs={'pk': self.pk})

    def __str__(self):
        return str(self.user) + ' - ' + str(self.customer_email)
