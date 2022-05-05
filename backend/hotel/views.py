from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Hotel
from .serializers import HotelSerializer


# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def hotel_list(request):
    if request.method =='POST':
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        hotels=Hotel.objects.all()
        serializer=HotelSerializer(hotels, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def hotel_details(request, pk):
    hotel=get_object_or_404(Hotel, pk=pk)
    if request.method == 'GET':
         serializer = HotelSerializer(hotel)
         return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = HotelSerializer(hotel, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        hotel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)