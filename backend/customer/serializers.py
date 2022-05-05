from rest_framework import serializers
from .models import Customer

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'address', 'address_id','user_id']
        depth = 1


    address_id = serializers.IntegerField(write_only=True)
    