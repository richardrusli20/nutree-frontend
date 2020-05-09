from django.db import models
from django.urls import reverse
from customerbag.models import CustomerBag
from customer.models import Customer
from vendor.models import Vendor
from foodlist.models import FoodList

class OrderItem(models.Model):
    order_id = models.PositiveIntegerField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    foodlist = models.ForeignKey(FoodList, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.PositiveIntegerField()

    # def get_absolute_url(self):
    #     return reverse('customer:detail', kwargs={'pk': self.pk})

    def __str__(self):
        return str(self.order_id) + ' - ' + str(self.customer) + ' - ' + str(self.foodlist) + ' - ' + str(self.vendor) + ' - ' + str(self.quantity)

