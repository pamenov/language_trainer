from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from word.serializers import CollectionSerializer
from .models import UserProfile

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')


class UserPageSerializer(serializers.ModelSerializer):
    my_collections = serializers.SerializerMethodField()
    used_collections = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    vocabulary = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'my_collections',
            'used_collections',
            'username',
            'avatar',
            'vocabulary'
        )

    def get_my_collections(self, obj):
        return [CollectionSerializer(item).data for item in obj.my_collections.all()]

    def get_used_collections(self, obj):
        return [CollectionSerializer(item).data for item in obj.used_collections.all()]

    def get_avatar(self, obj):
        obj.profile.avatar

    def get_vocabulary(self, obj):
        obj.profile.vocabulary