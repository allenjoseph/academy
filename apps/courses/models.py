from django.db import models
from django.template.defaultfilters import slugify
from apps.home.models import Department, Student, AcademyYear, Parameter, Profesor

class Course(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, blank=True)
    department = models.ForeignKey(Department)
    slug = models.SlugField(blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Course, self).save(*args, **kwargs)

    def __unicode__(self):
        return u'%s' % (self.name)

class AcademyCourse(models.Model):
    id = models.AutoField(primary_key=True)
    course = models.OneToOneField(Course)
    term = models.PositiveSmallIntegerField()
    profesor = models.ForeignKey(Profesor)
    academyYear = models.ForeignKey(AcademyYear)
    state = models.ForeignKey(Parameter)

    def __unicode__(self):
        return u'%s' % (self.course.name)

class AcademyCourseStudent(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student)
    academyCourse = models.ForeignKey(AcademyCourse)

    def __unicode__(self):
        return u'%s - %s' % (self.academyCourse.course.name,self.student.name)

