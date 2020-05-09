from django.db import models
from django.urls import reverse
from customer.models import Customer
from foodlist.models import FoodList

class CustomerBag(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    foodlist = models.ForeignKey(FoodList, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.PositiveIntegerField()

    def get_absolute_url(self):
        return reverse('customer:detail', kwargs={'pk': self.pk})

    def __str__(self):
        return str(self.customer) + ' - ' + str(self.foodlist) + ' - ' + str(self.quantity)
