from django.urls import path
from api.views import *

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('logout/', UsuarioView.as_view(), name='logout'),
    path('singin/', SingInView.as_view(), name='singin'),
    path('user/', UsuarioView.as_view(), name='usuario'),
]
