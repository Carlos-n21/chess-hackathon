from django.db import models


# Create your models here.
class Scoreboard(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Winner's name
    points = models.FloatField(default=0.0)  # 1 point per win, 0.5 per draw

    def __str__(self):
        return f"{self.name} - {self.points} pts"
