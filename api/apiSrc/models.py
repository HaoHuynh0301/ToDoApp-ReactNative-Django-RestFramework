from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

class Task(models.Model):
    date_published = models.DateTimeField(auto_now_add = True)
    content = models.TextField()

    class Meta:
        ordering = ['date_published']
        
    def __str__(self):
        return str(self.id)
        
        
class CustomUserManager(BaseUserManager):
    def create_user(self, email, user_name, name, date_of_birth, password = None):
        if not email:
            raise ValueError("Customer must have email")
        user = self.model(
            email = self.normalize_email(email),
            name = name,
            user_name = user_name,
            date_of_birth = date_of_birth,
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, user_name, name, date_of_birth, password = None):
        user = self.create_user(
            email = email,
            user_name = user_name,
            name = name,
            date_of_birth = date_of_birth,
            password = password
        )
        user.is_active = True
        user.is_superuser = True
        user.is_admin = True
        user.save()
        return user


class CustomUser(AbstractBaseUser):
    email = models.EmailField(max_length = 100, blank = False, null = False, unique = True, verbose_name = 'email')
    name = models.CharField(max_length = 200, blank = False, null = False, unique = True)
    user_name = models.CharField(max_length = 50, blank = False, null = False)
    date_of_birth = models.DateField()
    is_active = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    is_admin = models.BooleanField(default = False)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = ['email']
    REQUIRED_FIELDS = ['name', 'user_name', ' date_of_birth']
    
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin
    
    def has_perm(self, perm, obj = None):
        return True

    def has_module_perms(self, app_label):
        
        return True   
