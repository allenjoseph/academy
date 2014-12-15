from django.contrib import admin
from models import University, Faculty, Department, Course, Student

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('id','name','description',)

@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','university',)
    list_filter = ('university',)

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','faculty',)
    list_filter = ('faculty__university','faculty',)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','department',)
    list_filter = ('department__faculty','department',)

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id','provider','providerKey','name','lastname','photo','department',)
    list_filter = ('department__faculty','department',)