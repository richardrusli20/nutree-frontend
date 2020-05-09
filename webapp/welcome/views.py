from django.shortcuts import render,get_object_or_404
from foodlist.models import FoodList
from food.models import Food
from customer.models import Customer
from dietprogram.models import DietProgram
from django.views import generic
from vendor.models import Vendor
from customer.models import Customer

class IndexView(generic.ListView):
    model = Customer
    template_name = "welcome/index.html"

    def get_queryset(self):
        return DietProgram.objects.all()

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)

        user_now_username = self.request.user

        if user_now_username.groups.filter(name='vendor').exists():

            user_now_pk = user_now_username.pk
            vendor_result = Vendor.objects.filter(user=user_now_pk)
            vendor_result_pk = vendor_result[0].pk
            context['vendor_pk'] = vendor_result_pk

        elif user_now_username.groups.filter(name='customer').exists():
            user_now_pk = user_now_username.pk
            customer_result = Customer.objects.filter(user=user_now_pk)
            customer_result_pk = customer_result[0].pk
            context['customer_pk'] = customer_result_pk
            
        return context

# def index(request):

#     # create a dictionary
#     context = {
        
#     }

#     return render(request, "welcome/index.html", context)

def dietprogram_detail(request,dietprogram_id):

    # create a dictionary
    dietProgram = get_object_or_404(DietProgram, pk=dietprogram_id)

    return render(request, "welcome/dietprogram.html", {'dietProgram': dietProgram})

def foodlist_detail(request,foodlist_id):

    # create a dictionary
    foodlist = get_object_or_404(FoodList, pk=foodlist_id)

    return render(request, "welcome/foodlistdetail.html", {'foodlist': foodlist})

def about(request):

    context = {
    }

    return render(request, "welcome/about.html", context)
    


def gallery(request):

    context = {
    }

    return render(request, "welcome/gallery.html", context)


def dietprogram(request,dietprogram_id):

    # dietProgram = get_object_or_404(DietProgram, pk=dietprogram_id)
    # return render(request, "welcome/dietprogram.html", {'dietProgram': dietProgram})
    context={

    }

    return render(request, "welcome/dietprogram.html", context)
 


def blog(request):

    context = {
    }

    return render(request, "welcome/blog.html", context)
    
def contact(request):

    context = {
    }

    return render(request, "welcome/contact.html", context)

def foodlist(request,foodlist_id):
    foodlist = get_object_or_404(FoodList, pk=foodlist_id)
    # foodlist ={
        
    # }

    return render(request, "welcome/foodlist.html", foodlist)
