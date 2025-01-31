from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class ChessView(TemplateView):
    template_name = "game/chess.html"
    paginate_by = 6

