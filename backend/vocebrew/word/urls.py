from django.urls import path, include
# from rest_framework.routers import SimpleRouter
from .views import (
    WordDetail,
    CollectionViewSet,
    CollectionDetail,
    AddToFavoritesView,
    RandomWordFromCollection,
    AddWordToCollection,
    AddCollection,
)

# router = SimpleRouter()
# router.register('collections', CollectionViewSet)


urlpatterns = [
    path('word/<int:id>', WordDetail.as_view(), name='word_detail'),
    # path('set/<slug:slug>', ViewWord),
    path('collections/', CollectionViewSet.as_view(), name='collections_list'),
    path('collections/<int:id>', CollectionDetail.as_view(), name='collection_detail'),
    path('add-to-favorites/', AddToFavoritesView.as_view(), name='add_to_favorites'),
    path('collections/<int:id>/learn/', RandomWordFromCollection.as_view(), name='ask_word'),
    path('collections/<int:id>/addword/', AddWordToCollection.as_view(), name='add_word'),
    path('collections/add/', AddCollection.as_view(), name='add_collection'),
    
]
