import os
from django.db import models
from django.template.defaultfilters import slugify


class Master(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100, blank=True)

    def __unicode__(self):
        return u'%s' % (self.description)


class Parameter(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, blank=True)
    description = models.CharField(max_length=100, blank=True)
    master = models.ForeignKey(Master)

    def __unicode__(self):
        return u'%s' % (self.name)


class AcademyYear(models.Model):
    id = models.AutoField(primary_key=True)
    year = models.PositiveSmallIntegerField(blank=True, null=True)
    state = models.ForeignKey(Parameter)

    def __unicode__(self):
        return u'%s' % (self.year)


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


def get_image_path(instance, filename):
    return os.path.join(
        'student',
        str(instance.provider)+'_'+str(instance.providerKey),
        filename)


class Student(models.Model):
    id = models.AutoField(primary_key=True)
    provider = models.CharField(max_length=100, blank=True)
    providerKey = models.CharField(max_length=500, blank=True)
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    photo = models.ImageField(upload_to=get_image_path, blank=True, null=True)
    department = models.ForeignKey(Department)
    dateCreation = models.DateTimeField(auto_now_add=True)
    dateLastSeen = models.DateTimeField(blank=True, null=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)

    def __unicode__(self):
        return u'%s %s' % (self.name, self.lastname)


class Profesor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    title = models.CharField(max_length=100, blank=True)
    photo = models.ImageField(upload_to=get_image_path, blank=True, null=True)

    def __unicode__(self):
        return u'%s %s' % (self.name, self.lastname)


class Attachment(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True)
    size = models.PositiveIntegerField()
    attachment = models.FileField(upload_to='attachment/%Y/%m/%d')
    dateCreation = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return u'%s' % (self.attachment.name)
