from django.db import models;
from address.models import Address


# Create your models here.
class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=255)
    phone_number = models.IntegerField()
    addressId = models.ForeignKey(Address, on_delete=models.CASCADE, default=None)

    def __str__(self) -> str:
        return self.first_name