from django.urls import path
from . import views

urlpatterns = [
    path("", views.ChessView.as_view(), name='home'),
    path("score/", views.ScoreView.as_view(), name='score'),
    path("rules/", views.RulesView.as_view(), name='rules'),
]
