from django.conf.urls import url
from . import views

# namespace app dietprogram
app_name = "dietprogram"

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name="index"),
    url(r'^(?P<dietprogram_id>[0-9]+)/$', views.detail, name="detail"),
    url(r'^(?P<pk>[0-9]+)/update/$', views.DietProgramUpdate.as_view(), name="update"),
    url(r'^(?P<pk>[0-9]+)/delete/$', views.DietProgramDelete.as_view(), name="delete"),
]
