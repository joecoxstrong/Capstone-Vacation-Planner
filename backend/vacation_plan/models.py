from django.db import models
from addon.models import Addon
from customer.models import Customer
from hotel.models import Hotel
from park.models import Park
from authentication.models import User

# Create your models here.
class Vacation_Plan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, default=None)
    park = models.ForeignKey(Park, on_delete=models.CASCADE, default=None)
    addon = models.ForeignKey(Addon, on_delete=models.CASCADE, default=None)
    total_travelers = models.IntegerField()
    start_date = models.DateField()
    total_days = models.IntegerField()

    def __str__(self) -> str:
        return str(self.total_travelers)