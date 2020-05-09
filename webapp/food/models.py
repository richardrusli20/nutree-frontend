from django.db import models
from django.urls import reverse
from vendor.models import Vendor
from django.shortcuts import redirect

class Food(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    food_name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    calories = models.CharField(max_length=20)
    # food_photo = models.ImageField(upload_to='food_photo', blank=True)
    food_photo = models.CharField(max_length=1000)

    def get_absolute_url(self):
        # for now, food could be only added from vendor
        # after adding a new food, the user will be redirected to the vendor
        return reverse('vendor:vendor-food-view', kwargs={'pk': self.vendor.pk})

        #return reverse('food:detail', kwargs={'pk': self.pk})

    def __str__(self):
        return self.food_name + ' - ' + self.calories
