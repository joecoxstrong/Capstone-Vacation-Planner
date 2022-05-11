from django.urls import path, include
from vacation_plan import views
# from .views import render_pdf_view

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.vacation_plan_list),
    path('all/', views.vacation_plan_list),
    path('<int:pk>/', views.vacation_plan_details),
    path('pdf/', views.vacation_pdf, name ="vacation_pdf")
]

