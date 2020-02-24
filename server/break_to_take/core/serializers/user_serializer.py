from rest_framework import serializers
from break_to_take.core.models import User
from oauth2_provider.models import AccessToken
from django.contrib.auth.models import Permission, Group


class UserSerializer(serializers.ModelSerializer):
    """
    Сериализатор пользователя
    """
    permissions = serializers.SerializerMethodField('get_permissions')

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'sir_name', 'avatar', 'profile', 'groups',
                  'permissions')


class AccessTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessToken
        fields = ('scope', 'created', 'expires')
