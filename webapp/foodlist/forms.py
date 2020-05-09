from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

from foodlist.models import FoodList


class FoodlistForm(forms.ModelForm):
    class Meta:
        model = FoodList
        fields= ['foodlist_name', 'diet_program', 'foods', 'available_date', 'price', 'foodlist_logo']
        widgets = {
            'foods': forms.CheckboxSelectMultiple,
            'available_date': forms.SelectDateWidget(empty_label=("Select Year", "Select Month", "Select Day")),
        }

