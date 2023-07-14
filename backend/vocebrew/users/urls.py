from django.urls import path
from .views import UserPageView

urlpatterns =[
    path('profile/<int:id>', UserPageView.as_view(), name='users_page')
]