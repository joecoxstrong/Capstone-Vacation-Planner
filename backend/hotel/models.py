
from django.db import models;
from authentication.models import User


# Create your models here.
class Hotel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    hotel_name = models.CharField(max_length=200)
    hotel_link = models.CharField(max_length=255)
    

    def __str__(self) -> str:
        return self.hotel_name