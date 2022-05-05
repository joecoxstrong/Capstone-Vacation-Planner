from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Vacation_Plan
from .serializers import Vacation_PlanSerializer


# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def vacation_plan_list(request):
    if request.method =='POST':
        serializer = Vacation_PlanSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        vacation_plans=Vacation_Plan.objects.all()
        serializer=Vacation_PlanSerializer(vacation_plans, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def vacation_plan_details(request, pk):
    vacation_plan=get_object_or_404(Vacation_Plan, pk=pk)
    if request.method == 'GET':
         serializer = Vacation_PlanSerializer(vacation_plan)
         return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = Vacation_PlanSerializer(vacation_plan, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        vacation_plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)