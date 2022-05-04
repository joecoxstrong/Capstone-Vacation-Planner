from django.urls import path, include
from hotel import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.hotel_list),
    path('all/', views.hotel_list),
    path('<int:pk>/', views.hotel_details)
]