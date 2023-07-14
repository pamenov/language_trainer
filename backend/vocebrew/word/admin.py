from django.contrib import admin
from .models import Word, Collection, Tag

admin.site.register(Word)
admin.site.register(Collection)
admin.site.register(Tag)