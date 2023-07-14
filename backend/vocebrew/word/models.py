from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

User = get_user_model()


class Word(models.Model):
    PART_OF_SPEECH_CHOICES = [
        ('NOUN', 'noun'),
        ('VERB', 'verb'),
        ('ADJ', 'adjective'),
        ('PREPOSITION', 'preposition'),
        ('PRONOUN', 'pronoun'),
    ]
    hebrew = models.CharField(max_length=15)
    english = models.CharField(max_length=15)
    russian = models.CharField(max_length=15)
    frequency = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    part_of_speech = models.CharField(max_length=15, choices=PART_OF_SPEECH_CHOICES)
    tags = models.ManyToManyField('Tag', blank=True)
    users_statistics = models.ManyToManyField(User, through='WordStatistics')

    def __str__(self):
        return f"{self.hebrew} {self.english}"


class WordProperties(models.Model):
    PROPERTY_CHOICES = [
        ('ROOT', 'root'),
        ('VERB_CATEGORY', 'verb category'),
        ('GENDER', 'gender'),
        ('PREP_AFTER', 'prep_after')
    ]
    property_name = models.CharField(max_length=15, choices=PROPERTY_CHOICES)
    value = models.CharField(max_length=10)
    words = models.ManyToManyField(Word, related_name='words')


class Collection(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING, blank=True, related_name='my_collections')
    words = models.ManyToManyField(Word, related_name='collections')
    users_using = models.ManyToManyField(User, related_name='used_collections', blank=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.name


class WordStatistics(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    timesShown = models.IntegerField()
    timesCorrect = models.IntegerField()
