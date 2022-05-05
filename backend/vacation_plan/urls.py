from django.urls import path, include
from vacation_plan import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.vacation_plan_list),
    path('all/', views.vacation_plan_list),
    path('<int:pk>/', views.vacation_plan_details)
]