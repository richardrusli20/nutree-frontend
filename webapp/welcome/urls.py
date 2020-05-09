from django.conf.urls import url
from . import views

# namespace app welcome
app_name = "welcome"

urlpatterns = [
    # view.index = go to views.py and look for function called "index"
    # url(r'^$', views.index, name="index"),
    # url(r'^$', views.IndexView.as_view(), name="index"),
    url(r'^$', views.IndexView.as_view(), name="index"),
    url(r'^about/', views.about, name="about"),
    url(r'^gallery/', views.gallery, name="gallery"),
    url(r'^blog/', views.blog, name="blog"),
    url(r'^contact/', views.contact, name="contact"),
    url(r'^foodlist/$', views.foodlist, name="foodlist"),
    url(r'^dietprogram/$', views.dietprogram, name="dietprogram"),
    # url(r'^dietprogram/(?P<dietprogram_id>[0-9]+)/$', views.dietprogram_detail, name="welcome-dietprogram-detail"),
    # url(r'^dietprogram/(?P<dietprogram_id>[0-9]+)/foodlist/(?P<pk>[0-9]+)$', views.dietprogram_detail, name="welcome-dietprogram-detail"),
    # url(r'^foodlist/(?P<foodlist_pk>[0-9]+)/$', views.foodlist_detail, name="foodlist-detail"),
    #  url(r'^(?P<pk>[0-9]+)/foodlist/$', views.VendorFoodlistView.as_view(), name="vendor-foodlist-view"),
    # url(r'^foodlist/(?P<foodlist_id>[0-9]+)/$', views.foodlist_detail, name="foodlist-detail"),
    # url(r'^(?P<dietprogram_id>[0-9]+)/$', views.detail, name="detail"),
]