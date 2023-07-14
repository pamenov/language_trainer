from rest_framework import generics
from .serializers import UserPageSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserPageView(generics.RetrieveAPIView):
    serializer_class = UserPageSerializer
    queryset = User.objects.all()
    lookup_field = 'id'


# Create your views here.
