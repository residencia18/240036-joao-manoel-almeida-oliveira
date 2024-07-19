from django.urls import path
from api.views import *

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('logout/', UsuarioView.as_view(), name='logout'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('user/', UsuarioView.as_view(), name='usuario'),
]
