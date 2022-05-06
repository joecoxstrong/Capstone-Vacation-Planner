from django.db import models

from authentication.models import User



# Create your models here.
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    street = models.CharField(max_length=255, default=None)
    city = models.CharField(max_length=255, default=None)
    state = models.CharField(max_length=255, default=None)
    zipcode = models.IntegerField(default=None)
    
    def __str__(self) -> str:
        return self.first_name