from rest_framework import serializers
from .models import Park

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class ParkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Park
        fields = ['id', 'park_name', 'park_link']
        depth = 1
