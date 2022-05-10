
from django.db import models;
from authentication.models import User


# Create your models here.
class Addon(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    addon_name = models.CharField(max_length=200)
    addon_description = models.TextField()
    addon_price = models.DecimalField(max_digits=8, decimal_places=2, default=None)
    

    def __str__(self) -> str:
        return self.addon_name

       