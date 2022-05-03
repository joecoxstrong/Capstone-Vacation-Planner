from django.db import models
from customer.models import Customer
from hotel.models import Hotel
from park.models import Park

# Create your models here.
class Vacation_Plan(models.Model):
    
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    park = models.ForeignKey(Park, on_delete=models.CASCADE)
    total_travelers = models.IntegerField()
    start_date = models.DateField()
    total_days = models.IntegerField()

    def __str__(self) -> str:
        return self.park_name