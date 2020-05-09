from django.db import models
from django.urls import reverse
from dietprogram.models import DietProgram
from vendor.models import Vendor
from food.models import Food

class FoodList(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    foodlist_name = models.CharField(max_length=50)
    diet_program = models.ForeignKey(DietProgram, on_delete=models.CASCADE)
    foods = models.ManyToManyField(Food)
    description = models.CharField(max_length=1000)
    price = models.PositiveIntegerField()
    foodlist_logo = models.CharField(max_length=1000)
    available_date = models.DateField(blank=True, null=True)

    # after adding a new foodlist, the user will be redirected to the detail view of foodlist
    def get_absolute_url(self):
        return reverse('foodlist:foodlist-detail', kwargs={'pk': self.pk})
        #return reverse('vendor:vendor-foodlist-view', kwargs={'pk': self.vendor.pk})

    def __str__(self):
        return self.foodlist_name
