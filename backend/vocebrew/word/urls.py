from django.urls import path, include
# from rest_framework.routers import SimpleRouter
from .views import (
    WordDetail,
    CollectionViewSet,
    CollectionDetail,
    ChangeFavoritesView,
    RandomWordFromCollection,
    AddWordToCollection,
    AddCollection,
    GetResult,
)

# router = SimpleRouter()
# router.register('collections', CollectionViewSet)


urlpatterns = [
    path('word/<int:id>', WordDetail.as_view(), name='word_detail'),
    # path('set/<slug:slug>', ViewWord),
    path('collections/', CollectionViewSet.as_view(), name='collections_list'),
    path('collections/<int:id>', CollectionDetail.as_view(), name='collection_detail'),
    path('change-favorites/', ChangeFavoritesView.as_view(), name='change_favorites'),
    path('collections/<int:id>/learn/', RandomWordFromCollection.as_view(), name='ask_word'),
    path('collections/<int:id>/addword/', AddWordToCollection.as_view(), name='add_word'),
    path('collections/add/', AddCollection.as_view(), name='add_collection'),
    path('statistics/', GetResult.as_view(), name='statistics'),
    
]
