from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Park
from .serializers import ParkSerializer


# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def park_list(request):
    if request.method =='POST':
        serializer = ParkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        parks=Park.objects.all()
        serializer=ParkSerializer(parks, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def park_details(request, pk):
    park=get_object_or_404(Park, pk=pk)
    if request.method == 'GET':
         serializer = ParkSerializer(park)
         return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ParkSerializer(park, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        park.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)