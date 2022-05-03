from django.urls import path, include
from address import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.address_list),
    path('all/', views.address_list),
    path('<int:pk>/', views.address_details)
]
