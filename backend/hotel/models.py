
from django.db import models;



# Create your models here.
class Hotel(models.Model):
    hotel_name = models.CharField(max_length=200)
    hotel_link = models.CharField(max_length=255)
    

    def __str__(self) -> str:
        return self.hotel_name