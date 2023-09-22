from rest_framework import generics, viewsets
from .models import Word, Collection
from .serializers import WordSerializer, CollectionSerializer, CollectionDetailSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from random import choice


class WordDetail(generics.RetrieveAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    lookup_field = 'id'


class CollectionViewSet(generics.ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    lookup_field = 'id'


class CollectionDetail(generics.RetrieveAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionDetailSerializer
    lookup_field = 'id'


class AddToFavoritesView(APIView):
    def post(self, request):
        collection_id = request.data.get('collection_id')
        user = request.user

        try:
            collection = Collection.objects.get(pk=collection_id)
        except Collection.DoesNotExist:
            return Response({'error': 'Collection not found'}, status=status.HTTP_404_NOT_FOUND)

        # Add the item to the user's favorites
        collection.users_using.add(user)

        return Response({'success': 'Item added to favorites'}, status=status.HTTP_200_OK)


class RandomWordFromCollection(APIView):
    def get(self, request, id):
        collection = get_object_or_404(Collection, id=id)
        list_of_words = list(collection.words.all())
        correct_word = choice(list_of_words)
        if len(list_of_words) > 1 :
            fake_word = choice(list_of_words)
            while fake_word == correct_word:
                fake_word = choice(list_of_words)
        else:
            fake_word = Word.objects.get(pk=1)
        if (request.user):
            pass
        return Response({
            "hebrew": f"{correct_word.hebrew}",
            "translate": f"{correct_word.english}",
            "fake_translate": f"{fake_word.english}",
            "word_id": f"{correct_word.id}"
        }, status=status.HTTP_200_OK)


# class GetResult(APIView):
#     def post(self, request):
#         user = request.user
#         result = request.data.get("result")
#         word_id = request.data.get("word_id")
#         word = get_object_or_404(Word, id=word_id)
#
#         if result == "SUCCESS":






