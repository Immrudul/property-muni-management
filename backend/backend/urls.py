from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include all API-related routes
    path("property-assessment/", include("property_assessment.urls")),  # Include the new app
]
