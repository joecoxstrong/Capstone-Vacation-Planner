from django.urls import path, include
from addon import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.addon_list),
    path('all/', views.get_all_addons),
    path('<int:pk>/', views.addon_details)
]
