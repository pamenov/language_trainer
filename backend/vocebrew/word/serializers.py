from rest_framework import serializers
from .models import Word, Collection, WordStatistics
from random import choice


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
        if request and request.user.is_authenticated:
            return obj.users_using.filter(id=request.user.id).exists()
        return False


class CollectionDetailSerializer(serializers.ModelSerializer):
    list_of_words = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Collection
        fields = ('id', 'name', 'description', 'list_of_words', 'is_favorited')

    def get_list_of_words(self, obj):
        return [WordSerializer(word).data for word in obj.words.all()]

    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.users_using.filter(id=request.user.id).exists()
        return False


class StatisticsSerializer(serializers.ModelSerializer):

    class Meta:
        model = WordStatistics
        fields = "__all__"
        # fields = ('id', 'english')

# class CollectionRandomWordSerializer(serializers.ModelSerializer):
#     hebrew = serializers.SerializerMethodField()
#     # translation = serializers.SerializerMethodField()
#     # fake_translation = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Collection
#         fields  = ('hebrew',)
#
#     def get_hebrew(self, obj):
#         words_list = list(obj.words.all())
#         word = choice(words_list)
#         return word["hebrew"]


