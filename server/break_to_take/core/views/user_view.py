import datetime
from urllib.parse import urlencode

import jwt
import requests
from django.contrib.messages.storage.session import SessionStorage
from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import redirect
from django.utils.timezone import make_aware
from oauth2_provider.models import AccessToken
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.decorators import action, permission_classes
from rest_framework.utils import json
from rest_framework.viewsets import ViewSet
from break_to_take.core.serializers import AccessTokenSerializer
from break_to_take.core.models import User
from rest_framework.response import Response

from core.serializers import UserSerializer


class UserView(ViewSet):
    @staticmethod
    @permission_classes([AllowAny])
    @action(methods=['post'], detail=False)
    def get_user_by_token(request: Request) -> Response:
        access_token = request.data.get('token', None)
        if access_token:
            token = AccessToken.objects.get(token=access_token)
            user_id = token.user_id
            user = User.objects.get(id=user_id)
            return Response(UserSerializer(user).data)
        return Response()

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
        session = SessionStore()
        session['user_email'] = user.email
        session['user_token'] = token
        base_url = 'http://localhost:3000/'
        query_string = urlencode({'token': token, 'expiresIn': expires})  # 2 token=jwt-token
        url = '{}?{}'.format(base_url, query_string)  # 3 /<redirect-route>/?token=jwt-token
        return redirect(url)

    @staticmethod
    @action(methods=['get'], detail=False)
    def logout(request: Request) -> Response:
        try:
            AccessToken.objects.get(user=request.user).delete()
        except AccessToken.DoesNotExist:
            pass
        return Response({'status': 200})
