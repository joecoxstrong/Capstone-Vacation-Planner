from turtle import st
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Addon
from .serializers import AddonSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_addons(request):
    addons = Addon.objects.all()
    serializer = AddonSerializer(addons, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def addon_list(request):
    if request.method == 'POST':
        serializer = AddonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        addons = Addon.objects.filter(user_id=request.user.id)
        serializer = AddonSerializer(addons, many=True)
        return Response(serializer.data)
