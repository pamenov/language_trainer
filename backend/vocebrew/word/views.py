from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Word, Collection
from .serializers import WordSerializer, CollectionSerializer, CollectionDetailSerializer


class WordDetail(generics.RetrieveAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    lookup_field = 'id'


class CollectionViewSet(generics.ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    lookup_field = 'id'


class CollectionDetail(generics.RetrieveAPIView):
    print("im in CollectionDetail View", flush=True)
    queryset = Collection.objects.all()
    serializer_class = CollectionDetailSerializer
    lookup_field = 'id'







