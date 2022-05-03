from rest_framework import serializers
from .models import Vacation_Plan

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class Vacation_PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacation_Plan
        fields = ['id', 'customerId', 'hotelId', 'parkId', 'total_travelers', 'start_date', 'total_days']
        depth = 1
