from django.views.generic import TemplateView
from django.shortcuts import redirect
from .models import Scoreboard

# Create your views here.


class ChessView(TemplateView):
    template_name = "game/chess.html"

    def post(self, request):
        """Handles the form submission when a winner is submitting their name and result."""
        winner_name = request.POST.get("winner_name")
        game_result = request.POST.get("game_result")  # Win or Draw

        if winner_name:
            if game_result == "win":
                self.update_scoreboard(winner_name, points=1.0)  # Win = 1 point
            elif game_result == "draw":
                self.update_scoreboard(winner_name, points=0.5)  # Draw = 0.5 points
                # Optionally, add 0.5 points to the opponent as well
                opponent_name = request.POST.get("opponent_name")
                if opponent_name:
                    self.update_scoreboard(opponent_name, points=0.5)
        return redirect("score")  # Redirect to the leaderboard page

    def update_scoreboard(self, winner_name, points=1.0):
        """Updates the scoreboard when a player wins."""
        scoreboard_entry, created = Scoreboard.objects.get_or_create(name=winner_name)
        scoreboard_entry.points += points  # Add points to the player's score
        scoreboard_entry.save()


class ScoreView(TemplateView):
    template_name = "game/leaderboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['leaderboard_data'] = Scoreboard.objects.all().order_by('-points')
        return context


class RulesView(TemplateView):
    template_name = "game/rules.html"
