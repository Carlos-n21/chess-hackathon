from django.urls import path
from .views import ChessView

urlpatterns = [
    path("", ChessView.as_view, name='home'),
]