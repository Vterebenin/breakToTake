from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet


class UserView(ViewSet):
    @staticmethod
    @action(methods=['get'], detail=False)
    def info(request: Request) -> Response:
        print(request.user)
        return Response()

