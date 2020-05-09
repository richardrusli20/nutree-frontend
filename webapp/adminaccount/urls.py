from django.conf.urls import url
from . import views
from django.urls import path
from django.views.generic.base import RedirectView
from register.views import registerVendor as register_vendor

# namespace app vendor
app_name = "adminaccount"

urlpatterns = [
    # view.index = go to views.py and look for function called "index"
    # manage/
    url(r'^$', views.IndexView.as_view(), name="index"),

    # manage/vendor/
    url(r'^vendor/$', views.VendorView.as_view(), name="vendor-view"),
    # manage/vendor/add/
    url(r'^vendor/add/$', register_vendor, name="vendor-add"),
    # manage/vendor/<pk>/delete
    url(r'^vendor/(?P<pk>[0-9]+)/delete/$', views.VendorDelete.as_view(), name="vendor-delete"),

    # manage/dietprogram/
    url(r'^dietprogram/$', views.DietProgramView.as_view(), name="dietprogram-view"),
    # manage/dietprogram/add/
    url(r'^dietprogram/add/$', views.DietProgramAdd.as_view(), name="dietprogram-add"),
    

    # manage/order/
    url(r'^order/$', views.OrderView.as_view(), name="order-view"),

    # manage/customer/
    url(r'^customer/$', views.CustomerView.as_view(), name="customer-view"),

]