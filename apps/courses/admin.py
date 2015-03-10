from django.contrib import admin
from models import Course, AcademyCourse

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id','name','slug','description','department',)
    list_filter = ('department__faculty','department',)

@admin.register(AcademyCourse)
class AcademyCourseAdmin(admin.ModelAdmin):
    list_display = ('id','course','term','profesor','academyYear','state',)
    list_filter = ('course__department__faculty','course__department',)


