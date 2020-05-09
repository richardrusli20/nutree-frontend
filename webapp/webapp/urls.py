"""prototype URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from welcome import views as welcome_views
from register.views import registerCustomer as register_customer
from login.views import loginPage as login_page
from login.views import logoutUser as logout_user
from accounts import views as accounts_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/', login_page, name="login"),
    url(r'^register/', register_customer, name="register"),
    url(r'^logout/', logout_user, name="logout"),
    url(r'^manage/', include('adminaccount.urls')),
    url(r'^welcome/', include('welcome.urls')),
    url(r'^vendor/', include('vendor.urls')),
    url(r'^customer/', include('customer.urls')),
    url(r'^dietprogram/', include('dietprogram.urls')),
    url(r'^foodlist/', include('foodlist.urls')),
    url(r'^food/', include('food.urls')),

    # password reset
    url(r'^reset_password/$', accounts_views.PasswordReset.as_view(), name="password_reset"),
    url(r'^reset_password_sent/$', accounts_views.PasswordResetDone.as_view(), name="password_reset_done"),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', accounts_views.PasswordResetConfirm.as_view(), name="password_reset_confirm"),
    url(r'^reset_password_complete/$', accounts_views.PasswordResetComplete.as_view(), name="password_reset_complete"),
    
    # catch all other urls
    url(r'$', welcome_views.IndexView.as_view(), name='welcome-base'),
]
