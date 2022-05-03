
from django.db import models;



# Create your models here.
class Addon(models.Model):
    addon_name = models.CharField(max_length=200)
    addon_description = models.TextField()
    

    def __str__(self) -> str:
        return self.addon_name

       