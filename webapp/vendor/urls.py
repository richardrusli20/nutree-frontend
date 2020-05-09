from django.conf.urls import url
from . import views
from django.urls import path
from django.views.generic.base import RedirectView

# namespace app vendor
app_name = "vendor"

urlpatterns = [
    
    # /vendor/2/
    url(r'^(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name="index"),

    # /vendor/2/setting/
    #url(r'^(?P<pk>[0-9]+)/setting/$', views.VendorProfileView.as_view(), name="setting"),
    # /vendor/2/setting/profile/
    url(r'^(?P<pk>[0-9]+)/profile/$', views.VendorProfileView.as_view(), name="vendor-profile"),
    # /vendor/2/setting/profile/update/
    url(r'^(?P<pk>[0-9]+)/profile/update/$', views.VendorProfileUpdate.as_view(), name="vendor-profile-update"),

    # /vendor/2/food/
    url(r'^(?P<pk>[0-9]+)/food/$', views.VendorFoodView.as_view(), name="vendor-food-view"),
    # /vendor/2/food/add/
    url(r'^(?P<pk>[0-9]+)/food/add/$', views.VendorFoodAdd.as_view(), name="vendor-food-add"),


    # /vendor/2/foodlist/
    url(r'^(?P<pk>[0-9]+)/foodlist/$', views.VendorFoodlistView.as_view(), name="vendor-foodlist-view"),
    # /vendor/2/foodlist/add/
    url(r'^(?P<pk>[0-9]+)/foodlist/add/$', views.VendorFoodlistAdd.as_view(), name="vendor-foodlist-add"),

    # /vendor/2/order/
    url(r'^(?P<pk>[0-9]+)/order/$', views.VendorOrderView.as_view(), name="vendor-order-view"),

    # /vendor/2/password_change/
    url(r'^(?P<pk>[0-9]+)/password_change/$', views.ChangePassword.as_view(), name="password-change"),
    url(r'^(?P<pk>[0-9]+)/password_change/done/$', views.ChangePassword.as_view(), name="password-change-done"),
    


]