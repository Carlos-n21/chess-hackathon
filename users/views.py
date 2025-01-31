from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
def register_view(request):
    return render(request, "users/login.html")
def register_view(request):
    form = UserCreationForm()
    return(request, "..\login.html", {"form":form})