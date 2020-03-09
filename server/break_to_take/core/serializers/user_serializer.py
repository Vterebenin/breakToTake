from rest_framework import serializers
from break_to_take.core.models import User
from oauth2_provider.models import AccessToken
from django.contrib.auth.models import Permission, Group


class UserSerializer(serializers.ModelSerializer):
    """
    Сериализатор пользователя
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class AccessTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessToken
        fields = '__all__'
