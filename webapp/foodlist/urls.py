from django.conf.urls import url
from . import views

from customerbag import views as customerbag_views

# namespace app foodlist
app_name = "foodlist"

urlpatterns = [
    url(r'^$', views.FoodListIndex.as_view(), name="foodlist-index"),

    url(r'^(?P<pk>[0-9]+)/$', views.FoodListDetail.as_view(), name="foodlist-detail"),

    url(r'^(?P<pk>[0-9]+)/delete/$', views.FoodlistDelete.as_view(), name="foodlist-delete"),

    url(r'^(?P<pk>[0-9]+)/update/$', views.FoodlistUpdate.as_view(), name="foodlist-update"),

    url(r'^(?P<pk>[0-9]+)/add-to-bag/(?P<quantity>[0-9]+)/$', customerbag_views.AddFoodListToBag.as_view(), name="foodlist-add-to-bag"),

    url(r'^(?P<pk>[0-9]+)/remove-from-bag/$', customerbag_views.RemoveFoodListFromBag.as_view(), name="foodlist-remove-from-bag"),
]