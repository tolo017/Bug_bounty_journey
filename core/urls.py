from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),

    path('subscribe/', views.subscribe_view, name='subscribe'),
    path('paypal/process/', views.paypal_process_view, name='paypal_process'),

    path('week/<int:week_number>/', views.week_detail_view, name='week_detail'),
    path('week/<int:week_number>/day/<int:day_number>/', views.day_detail_view, name='day_detail'),
    path('week/<int:week_number>/day/<int:day_number>/submit-quiz/', views.submit_quiz_view, name='submit_quiz'),
    path('week/<int:week_number>/day/<int:day_number>/submit-report/', views.submit_daily_report_view, name='submit_daily_report'),
    path('week/<int:week_number>/submit-flag/', views.submit_flag_view, name='submit_flag'),
    path('week/<int:week_number>/submit-report/', views.submit_report_view, name='submit_report'),

    path('portfolio-export/', views.portfolio_export_view, name='portfolio_export'),

    path('api/youtube-search/', views.youtube_search_api_view, name='youtube_search_api'),

    # Interactive CTF Target Playground Endpoints
    path('lab-playground/week-<int:week_number>/target/', views.lab_playground_target_view, name='lab_playground_target'),
    path('lab-playground/week-<int:week_number>/day-<int:day_number>/target/', views.lab_playground_daily_target_view, name='lab_playground_daily_target'),
]
