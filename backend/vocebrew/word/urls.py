from django.urls import path, include
# from rest_framework.routers import SimpleRouter
from .views import WordDetail, CollectionViewSet, CollectionDetail, AddToFavoritesView

# router = SimpleRouter()
# router.register('collections', CollectionViewSet)


urlpatterns = [
    path('word/<int:id>', WordDetail.as_view(), name='word_detail'),
    # path('set/<slug:slug>', ViewWord),
    path('collections/', CollectionViewSet.as_view(), name='collections_list'),
    path('collections/<int:id>', CollectionDetail.as_view(), name='collection_detail'),
    path('add-to-favorites/', AddToFavoritesView.as_view(), name='add_to_favorites'),
]
