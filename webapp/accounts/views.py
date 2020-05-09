from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.auth.views import PasswordChangeView, PasswordChangeDoneView
from django.contrib.auth.views import PasswordResetView,  PasswordResetDoneView 
from django.contrib.auth.views import PasswordResetConfirmView, PasswordResetCompleteView
from django.contrib.auth.models import User, Group
from django.urls import reverse_lazy
from django.urls import reverse
from django.shortcuts import redirect
from django.contrib import messages


class PasswordReset(PasswordResetView):
    
    template_name = "accounts/password_reset.html"

    # Todo: check entered email in User db
    # Todo: override internal email send function
    # def post(self, request, **kwargs):

    #     entered_email = request.POST['email']
    #     user_qs = User.objects.filter(username=entered_email)

    #     if not user_qs:
    #         # user not found
    #         messages.info(request, 'Email is not registered')
    #         return redirect('password_reset')
    #     else:
    #         # user found
    #         # NOW EMAIL NOT BEING SENT. 
    #         # Todo: override internal email send function

    #         return redirect('password_reset_done')

class PasswordResetDone(PasswordResetDoneView):

    template_name="accounts/password_reset_sent.html"

class PasswordResetConfirm(PasswordResetConfirmView):

    template_name="accounts/password_reset_form.html"

class PasswordResetComplete(PasswordResetCompleteView):

    template_name="accounts/password_reset_complete.html"

