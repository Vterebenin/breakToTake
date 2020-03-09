from random import choice
from django.db import models
from string import ascii_lowercase
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from break_to_take.core.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Модель пользователя для авторизации
    """
    username = models.CharField(_('Login'), max_length=30, unique=True)  # Login пользователя
    email = models.EmailField(null=True)  # email
    created = models.DateTimeField(_('created'), auto_now_add=True)  # Дата добавления пользователя

    USERNAME_FIELD = 'username'  # Имя, которое импользуем в качестве идентификатора
    REQUIRED_FIELDS = []  # Список полей при создании createsuperuser

    objects = UserManager()

    class Meta:
        db_table = 'users'

    def get_token(self):
        token = ''.join(choice(ascii_lowercase) for _ in range(40))
        return token
