
from django.db import models;



# Create your models here.
class Addons(models.Model):
    addon_name = models.CharField(max_length=200)
    addon_desctription = models.TextField()
    

    def __str__(self) -> str:
        return self.addon_name