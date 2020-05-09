from django.conf.urls import url
from . import views
from django.contrib.auth import views as auth_views

from customerbag import views as customerbag_views

# namespace app dietprogram
app_name = "customer"

urlpatterns = [
    
    # # /customer/2/
    url(r'^(?P<pk>[0-9]+)/$', views.redirect_to_profile, name="index"),
    # /customer/2/profile/
    url(r'^(?P<pk>[0-9]+)/profile/$', views.ProfileView.as_view(), name="profile"),

    # /customer/2/profile/update/
    url(r'^(?P<pk>[0-9]+)/profile/update/$', views.ProfileUpdate.as_view(), name="profile-update"),

    # /customer/2/address/
    url(r'^(?P<pk>[0-9]+)/address/$', views.AddressView.as_view(), name="address"),
    # /customer/2/address/update/
    url(r'^(?P<pk>[0-9]+)/address/update/$', views.AddressUpdate.as_view(), name="address-update"),

    # /customer/2/mybag/
    url(r'^(?P<pk>[0-9]+)/mybag/$', customerbag_views.CustomerBagIndex.as_view(), name="mybag"),

    # /customer/2/checkout/
    url(r'^(?P<pk>[0-9]+)/checkout/$', views.CustomerCheckout.as_view(), name="checkout"),
    
    # /customer/2/pay/
    url(r'^(?P<pk>[0-9]+)/pay/$', views.CustomerPay.as_view(), name="pay"),

    # PROTOTYPE FOR PAYMENT:
    # MAYBE NEED A TOKEN, (from backend or payment gateway)
    # ---- /customer/2/pay/<token>/ ----
    # ---- /customer/2/pay/success/<token> ----
    # ---- /customer/2/pay/failed/<token> ----

    # /customer/2/pay/creditcart
    url(r'^(?P<pk>[0-9]+)/pay/creditcard/$', views.CreditCard.as_view(), name="credit-card"),

    # /customer/2/pay/success/
    url(r'^(?P<pk>[0-9]+)/pay/success/$', views.PaymentSuccess.as_view(), name="payment-success"),
    # /customer/2/pay/failed/
    url(r'^(?P<pk>[0-9]+)/pay/failed/$', views.PaymentFailed.as_view(), name="payment-failed"),

    # /customer/2/orderhistory/
    url(r'^(?P<pk>[0-9]+)/orderhistory/$', views.OrderHistory.as_view(), name="order-history"),


    # # /customer/2/change-password
    url(r'^(?P<pk>[0-9]+)/password_change/$', views.ChangePassword.as_view(), name="password-change"),
    url(r'^(?P<pk>[0-9]+)/password_change/done/$', views.ChangePassword.as_view(), name="password-change-done"),
    url(r'^(?P<pk>[0-9]+)/delete-account/$', views.DeleteAccountConfirmation.as_view(), name="delete-account-confirmation"),
]