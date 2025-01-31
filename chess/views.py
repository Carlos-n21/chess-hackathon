from django.shortcuts import render

def chessPage(request):
    return render(request, 'chess.html')

def loginPage(request):
    return render(request, 'login.html')

class