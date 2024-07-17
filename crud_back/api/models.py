from django.db import models
from django.contrib.auth.models import User

class Usuario(User):
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.username