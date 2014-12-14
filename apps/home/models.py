import os
from django.db import models

class University(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=300)

	def __str__(self):
		return '%s' % (self.name)

class Faculty(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=300)
	university = models.ForeignKey(University)

	def __str__(self):
		return '%s' % (self.name)

class Department(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=300)
	faculty = models.ForeignKey(Faculty)

	def __str__(self):
		return '%s' % (self.name)

class Course(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=300)
	department = models.ForeignKey(Department)

	def __str__(self):
		return '%s' % (self.name)

def get_image_path(instance, filename):
	return os.path.join('student', str(instance.id), filename)

class Student(models.Model):
	id = models.AutoField(primary_key=True)
	provider = models.CharField(max_length=100)
	providerKey = models.CharField(max_length=500)
	name = models.CharField(max_length=100)
	lastname = models.CharField(max_length=100)
	photo = models.ImageField(upload_to=get_image_path, blank=True, null=True)
	department = models.ForeignKey(Department)

	def __str__(self):
		return '%s' % (self.name)
