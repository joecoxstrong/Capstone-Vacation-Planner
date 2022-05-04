from django.urls import path, include
from customer import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.customer_list),
    path('all/', views.customer_list),
    path('<int:pk>/', views.customer_details)
]