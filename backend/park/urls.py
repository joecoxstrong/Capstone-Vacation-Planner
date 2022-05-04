from django.urls import path, include
from park import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.park_list),
    path('all/', views.park_list),
    path('<int:pk>/', views.park_details)
]