from rest_framework import generics, viewsets
from .models import Word, Collection, WordStatistics
from .serializers import WordSerializer, CollectionSerializer, CollectionDetailSerializer, StatisticsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from random import choice
from .permissions import isOwner


class CORSListAPIView(generics.ListAPIView):

    def dispatch(self, *args, **kwargs):
        response = super(generics.ListAPIView, self).dispatch(*args, **kwargs)
        response['Access-Control-Allow-Origin'] = '*'
        return response


class WordDetail(generics.RetrieveAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    lookup_field = 'id'


# class CollectionViewSet(generics.ListAPIView):
class CollectionViewSet(CORSListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    lookup_field = 'id'


class CollectionDetail(generics.RetrieveAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionDetailSerializer
    lookup_field = 'id'


class ChangeFavoritesView(APIView):
    def post(self, request):
        print(request.data)
        collection_id = request.data.get('collection_id')
        user = request.user

        try:
            collection = Collection.objects.get(pk=collection_id)
        except Collection.DoesNotExist:
            return Response({'error': 'Collection not found'}, status=status.HTTP_404_NOT_FOUND)

        # Add the item to the user's favorites
        is_favorited = collection.users_using.filter(pk=user.pk).exists()
        if is_favorited:
            collection.users_using.remove(user)
        else:
            collection.users_using.add(user)

        return Response({'success': 'Item status changed'}, status=status.HTTP_200_OK)


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


class AddWordToCollection(APIView):
    permission_classes = (isOwner,)
    def post(self, request, id):
        collection = get_object_or_404(Collection, id=id)
        try:
            hebrew = request.data['hebrew']
            english = request.data['english']
            russian = request.data['russian']
        except:
            return Response({'Bad request': 'missing data in request body'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            word = Word.objects.get(hebrew=hebrew)
        except:
            word = Word.objects.create(
                hebrew=hebrew,
                english=english,
                russian=russian,
            )
        collection.words.add(word)
        return Response({'success': 'Item word added to collection'}, status=status.HTTP_200_OK)

    
    
class AddCollection(APIView):
    def add_word(collection, word):
        try:
            word_obj = Word.objects(word["hebrew"])
        except:
            word_obj = Word.objects.create(
                hebrew=word["hebrew"],
                english=word["english"],
                russian=word["russian"],
            )
        collection.words.add(word)

    def post(self, request):
        try:
            name = request.data["name"]
            description = request.data["description"]
            words = request.data["words"]
        except:
            return Response({'Bad request': 'missing data in request body'}, status=status.HTTP_400_BAD_REQUEST)
        collection = Collection.objects.create(
            name=name,
            description=description,
            owner=request.user
        )
        for word in words:
            self.add_word(collection, word)
        return(Response({'pk': collection.pk}, status=status.HTTP_200_OK))




class GetResult(APIView):
    def post(self, request):
        user = request.user
        isCorrect = request.data.get("isCorrect")
        word_id = request.data.get("word_id")
        word = get_object_or_404(Word, id=word_id)

        statistics = WordStatistics.objects.filter(user=user, word=word).first()
        if statistics is not None:
            statistics.timesShown += 1
            statistics.timesCorrect += int(isCorrect)
            statistics.save()
        else:
            statistics = WordStatistics.objects.create(
                word=word,
                user=user,
                timesShown=1,
                timesCorrect=int(isCorrect)
            )
        return(Response({'statistics': StatisticsSerializer(statistics).data}, status=status.HTTP_200_OK))





