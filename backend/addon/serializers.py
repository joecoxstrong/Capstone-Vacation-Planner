from rest_framework import serializers
from .models import Addon

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class AddonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addon
        fields = ['id', 'addon_name', 'addon_description', 'addon_price', 'user_id']
        depth = 1

    