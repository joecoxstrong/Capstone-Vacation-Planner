
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Address
from .serializers import AddressSerializer
# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def address_list(request):
    if request.method =='POST':
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        addresses=Address.objects.all()
        serializer=AddressSerializer(addresses, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def address_details(request, pk):
    address=get_object_or_404(Address, pk=pk)
    if request.method == 'GET':
         serializer = AddressSerializer(address)
         return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AddressSerializer(address, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)