import os
from django.db import models
from django.template.defaultfilters import slugify

class University(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    acronym = models.CharField(max_length=10)
    description = models.CharField(max_length=300, blank=True)

    def __unicode__(self):
        return u'%s' % (self.name)

class Faculty(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, blank=True)
    university = models.ForeignKey(University)

    def __unicode__(self):
        return u'%s' % (self.name)

class Department(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, blank=True)
    faculty = models.ForeignKey(Faculty)
    slug = models.SlugField(blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Department, self).save(*args, **kwargs)

    def __unicode__(self):
        return u'%s' % (self.name)

class Course(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    term = models.PositiveSmallIntegerField()
    description = models.CharField(max_length=300, blank=True)
    department = models.ForeignKey(Department)
    slug = models.SlugField(blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Course, self).save(*args, **kwargs)

    def __unicode__(self):
        return u'%s' % (self.name)

def get_image_path(instance, filename):
    return os.path.join('student', str(instance.provider)+'_'+str(instance.providerKey), filename)

class Student(models.Model):
    id = models.AutoField(primary_key=True)
    provider = models.CharField(max_length=100, blank=True)
    providerKey = models.CharField(max_length=500, blank=True)
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    photo = models.ImageField(upload_to=get_image_path, blank=True, null=True)
    department = models.ForeignKey(Department)

    def __unicode__(self):
        return u'%s %s' % (self.name,self.lastname)

class Attachment(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=True)
    dateCreation = models.DateTimeField(auto_now_add=True)
    attachment = models.FileField(upload_to='attachment/%Y/%m/%d')

    def __unicode__(self):
        return u'%s' % (self.attachment.name)

