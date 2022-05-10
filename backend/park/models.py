from tkinter import CASCADE
from django.db import models;
from authentication.models import User



# Create your models here.
class Park(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    park_name = models.CharField(max_length=200)
    park_link = models.CharField(max_length=255)
    park_cost=models.DecimalField(max_digits=8, decimal_places=2, default=None)
    

    def __str__(self) -> str:
        return self.park_name