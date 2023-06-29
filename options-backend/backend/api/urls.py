from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.get_routes, name="routes"),
    path('stock/<str:ticker>/<int:K>/<int:Kd>/<int:T>/<int:Td>', views.get_stock_data, name="stock"),
    path('stochastic/<int:K>/<int:Kd>/<int:T>/<int:Td>/<int:steps>/<int:paths>', views.get_stochastic_data, name="stochastic"),
]
