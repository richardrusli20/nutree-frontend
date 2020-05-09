from django.conf.urls import url
from . import views

# namespace app food
app_name = "food"

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/$', views.FoodDetailView.as_view(), name="detail"),
    url(r'^(?P<pk>[0-9]+)/delete/$', views.FoodDelete.as_view(), name="food-delete"),
    url(r'^(?P<pk>[0-9]+)/update/$', views.FoodUpdate.as_view(), name="food-update"),
]
