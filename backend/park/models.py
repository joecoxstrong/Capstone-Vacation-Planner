from django.db import models;



# Create your models here.
class Park(models.Model):
    park_name = models.CharField(max_length=200)
    park_link = models.CharField(max_length=255)
    

    def __str__(self) -> str:
        return self.park_name