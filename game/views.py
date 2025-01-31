from django.shortcuts import render

# Create your views here.

def chess(request):
    return render(request, 'chess.html')

def chessPage(request):
    return render(request, 'game.html')

def loginPage(request):
    return render(request, 'login.html')