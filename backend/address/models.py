from django.db import models


# Create your models here.
class Address(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zipcode = models.IntegerField()
    


    def __str__(self) -> str:
        return self.street
