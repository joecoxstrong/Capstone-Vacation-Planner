from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

import vacation_plan
from .models import Vacation_Plan
from .serializers import Vacation_PlanSerializer
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa


import reportlab
import io
from django.http import FileResponse
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter


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

@api_view(['GET'])
@permission_classes([AllowAny])
def vacation_pdf(request):
    # Create a file-like buffer to receive PDF data.
    buffer = io.BytesIO()

    # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer, pagesize=letter, bottomup=0)

    text_object= p.beginText()
    text_object.setTextOrigin(inch, inch)
    text_object.setFont('Helvetica', 14)
    
    vacation_plans=Vacation_Plan.objects.all()
    lines = []

    for vacation_plan in vacation_plans:
        lines.append(vacation_plan.customer.first_name)
        lines.append(vacation_plan.hotel.hotel_name)
        lines.append(str(vacation_plan.hotel.hotel_cost))
        lines.append(vacation_plan.park.park_name)
        lines.append(str(vacation_plan.park.park_cost))
        lines.append(vacation_plan.addon.addon_name)
        lines.append(str(vacation_plan.addon.addon_price))
        lines.append(str(vacation_plan.total_travelers))
        lines.append(str(vacation_plan.start_date))
        lines.append(str(vacation_plan.total_days))
        lines.append("_______________________________________________________________ ")

    for line in lines: 
        text_object.textLine(line)

    p.drawText(text_object)    
    
    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    # p.drawString(100, 700, "Hello world.")

    # Close the PDF object cleanly, and we're done.
    p.showPage()
    p.save()

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename='vacation.pdf')