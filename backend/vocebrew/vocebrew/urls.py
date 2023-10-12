from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('api/', include("word.urls")),
    path('api/', include("users.urls")),
    path('admin/', admin.site.urls),
    # path('', include('auth_api.urls')),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
]
