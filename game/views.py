from django.views.generic import TemplateView

# Create your views here.


class ChessView(TemplateView):
    template_name = "game/chess.html"


class ScoreView(TemplateView):
    template_name = "game/leaderboard.html"


class RulesView(TemplateView):
    template_name = "game/rules.html"
