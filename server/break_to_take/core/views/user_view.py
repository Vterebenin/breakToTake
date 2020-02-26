import datetime
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from django.utils.timezone import make_aware
from oauth2_provider.models import AccessToken
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.decorators import action, permission_classes
from rest_framework.viewsets import ViewSet
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from rest_framework.utils import json
from django.utils import timezone
from rest_framework.response import Response
import requests
from break_to_take.core.models import User
from break_to_take.core.serializers import AccessTokenSerializer


class UserView(ViewSet):
    @staticmethod
    @permission_classes([AllowAny])
    @action(methods=['get'], detail=False)
    def token(request: Request) -> Response:
        user = User.objects.get(email=request.user.email)
        token = AccessToken.objects.filter(user=user)
        return Response(AccessTokenSerializer(token).data)

    @staticmethod
    @permission_classes([AllowAny])
    @action(methods=['get'], detail=False)
    def info(request: Request) -> Response:
        user = User.objects.get(email=request.user.email)
        token = user.get_token()
        datetime_now = datetime.datetime.now()
        expires = datetime_now + datetime.timedelta(days=2)
        expires = make_aware(expires)
        AccessToken.objects.filter(user=user).delete()
        AccessToken.objects.create(
            token=token,
            user=user,
            expires=expires
        )
        return redirect('/')

    @staticmethod
    @action(methods=['get'], detail=False)
    def logout(request: Request) -> Response:
        try:
            AccessToken.objects.get(user=request.user).delete()
        except AccessToken.DoesNotExist:
            pass
        return Response({ 'status': 200 })
