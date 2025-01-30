from django.http import HttpResponse

def chessPage(request):
    return HttpResponse("Test")

def loginPage(request):
    return HttpResponse("Test 2")