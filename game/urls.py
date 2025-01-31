from django.urls import path
from . import views

urlpatterns = [
    path('', views.chess, name='chess'),
    path('game/', views.chessPage, name='game'),
    path('login/', views.loginPage, name='login'),
]