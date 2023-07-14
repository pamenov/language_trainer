from rest_framework import serializers
from .models import Word, Collection


class WordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Word
        fields = ('id', 'hebrew', 'english', 'russian')
        # fields = ('id', 'english')


class CollectionSerializer(serializers.ModelSerializer):
    word_counter = serializers.SerializerMethodField()

    class Meta:
        model = Collection
        fields = ("name", "description", "word_counter")

    def get_word_counter(self, obj):
        return obj.words.count()


class CollectionDetailSerializer(serializers.ModelSerializer):
    list_of_words = serializers.SerializerMethodField()

    class Meta:
        model = Collection
        fields = ('id', 'name', 'description', 'list_of_words')
        # fields = ('id', 'name', 'description')

    def get_list_of_words(self, obj):
        return [WordSerializer(word).data for word in obj.words.all()]
