"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path, include
from django.contrib.auth.views import auth_logout

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include('social_django.urls', namespace='social')),
    path('core/', include('break_to_take.core.urls')),
    url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('logout/', auth_logout, name='logout')
]

