from django.contrib import admin
from models import AcademyYear, University, Faculty, Department, Student, Profesor, Parameter, Master, Attachment


@admin.register(AcademyYear)
class AcademyYearAdmin(admin.ModelAdmin):
    list_display = ('id','year','state',)

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('id','name','description',)

@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','university',)
    list_filter = ('university',)

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id','name','slug','description','faculty',)
    list_filter = ('faculty__university','faculty',)

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id','provider','providerKey','name','lastname','photo','department',)
    list_filter = ('department__faculty','department',)

@admin.register(Profesor)
class ProfesorAdmin(admin.ModelAdmin):
    list_display = ('id','name','lastname','title','photo',)
    list_filter = ('title',)

@admin.register(Parameter)
class ParameterAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','master',)
    list_filter = ('master',)

@admin.register(Master)
class MasterAdmin(admin.ModelAdmin):
    list_display = ('id','description',)

@admin.register(Attachment)
class Attachment(admin.ModelAdmin):
    list_display = ('id','title','attachment','dateCreation',)
