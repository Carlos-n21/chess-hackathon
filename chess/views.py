from django.shortcuts import render

def chess(request):
    return render(request, 'game/chess.html')

def chessPage(request):
    return render(request, 'game.html')

def loginPage(request):
    return render(request, 'login.html')