from rest_framework import serializers
from .models import Vacation_Plan

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class Vacation_PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacation_Plan
        fields = ['id', 'customer', 'customer_id', 'hotel', 'hotel_id', 'park', 'park_id', 'addon', 'addon_id', 'total_travelers', 'start_date', 'total_days', 'user_id']
        depth = 1


    customer_id = serializers.IntegerField(write_only=True)
    hotel_id = serializers.IntegerField(write_only=True)
    park_id = serializers.IntegerField(write_only=True)
    addon_id = serializers.IntegerField(write_only=True)