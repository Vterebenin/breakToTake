from random import choice
from django.db import models
from string import ascii_lowercase
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _


class User(AbstractBaseUser, PermissionsMixin):
    """
    Модель пользователя для авторизации
    """
    username = models.CharField(_('Login'), max_length=30, unique=True)  # Login пользователя
    email = models.EmailField(null=True)  # email
    created = models.DateTimeField(_('created'), auto_now_add=True)  # Дата добавления пользователя

    USERNAME_FIELD = 'username'  # Имя, которое импользуем в качестве идентификатора
    REQUIRED_FIELDS = []  # Список полей при создании createsuperuser

    class Meta:
        db_table = 'users'

    @property
    def get_full_name(self):
        return "%s %s" % (self.last_name, self.first_name)

    def get_token(self):
        token = ''.join(choice(ascii_lowercase) for _ in range(40))
        self.resetpassword_set.create(token=token)
        return token
