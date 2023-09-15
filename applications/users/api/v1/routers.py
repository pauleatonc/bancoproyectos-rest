from rest_framework.routers import DefaultRouter

from applications.users.api.v1.usersViewSet import UserViewSet

router = DefaultRouter()

router.register('users', UserViewSet, basename='users')

urlpatterns = router.urls