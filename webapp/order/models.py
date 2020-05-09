from django.db import models
from django.urls import reverse
from orderitem.models import OrderItem
from customer.models import Customer
from vendor.models import Vendor
from foodlist.models import FoodList

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    item = models.ManyToManyField(OrderItem)
    order_date = models.CharField(max_length=50)
    payment_type = models.CharField(max_length=50)
    grand_total = models.PositiveIntegerField()

    # def get_absolute_url(self):
    #     return reverse('vendor:vendor-order-view', kwargs={'pk': self.pk})

    def __str__(self):
        return (str(self.pk) + ' ; ' + str(self.customer) + ' ; ' + str(self.item) + ' ; ' + str(self.order_date) + ' ; ' + str(self.payment_type) + ' ; ' + str(self.grand_total))

