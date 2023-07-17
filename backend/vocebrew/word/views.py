from rest_framework import generics, viewsets
from .models import Word, Collection
from .serializers import WordSerializer, CollectionSerializer, CollectionDetailSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


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





