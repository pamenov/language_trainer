from rest_framework import serializers
from .models import Word, Collection


class WordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Word
        fields = ('id', 'hebrew', 'english', 'russian')
        # fields = ('id', 'english')


class CollectionSerializer(serializers.ModelSerializer):
    word_counter = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Collection
        fields = ("id", "name", "description", "word_counter", "is_favorited")

    def get_word_counter(self, obj):
        return obj.words.count()

    def get_is_favorited(self, obj):
        request = self.context.get('request')
        print("I'm in get favorited", request.user.is_authenticated)
        if request and request.user.is_authenticated:
            print("Im in serialize if will return", obj.users_using.filter(id=request.user.id).exists(), flush=True)
            return obj.users_using.filter(id=request.user.id).exists()
        return False


class CollectionDetailSerializer(serializers.ModelSerializer):
    list_of_words = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Collection
        fields = ('id', 'name', 'description', 'list_of_words', 'is_favorited')
        # fields = ('id', 'name', 'description')

    def get_list_of_words(self, obj):
        return [WordSerializer(word).data for word in obj.words.all()]

    def get_is_favorited(self, obj):
        print("in get_is_favorited")
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            print("authentificated")
            return obj.users_using.filter(id=request.user.id).exists()
        return False
