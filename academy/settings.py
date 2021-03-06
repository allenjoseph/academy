"""
Django settings for academy project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""
from django.utils.translation import ugettext_lazy as _

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
# print(BASE_DIR)

# print(BASE_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ozuns%gw4etatlz9i4=bgbsqxdjsvqrj*c0r((=b=60c1pbw!2'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

TIME_ZONE = 'America/Lima'

# Application definition
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'apps.pages',
    'apps.home',
    'apps.courses',
    'apps.discussions',
    'apps.exams'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'academy.urls'

WSGI_APPLICATION = 'academy.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR + '/academy.db'
    }
}

# Internationalization
LANGUAGES = (
    ('es', _('Spanish')),
    ('en', _('English')),
)

LANGUAGE_CODE = 'es'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOCALE_PATHS = (
    BASE_DIR + '/conf/locale/',
)

# Media files
MEDIA_URL = '/media/'

MEDIA_ROOT = BASE_DIR + '/media/'

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Descomnetar al ejecutar los comandos
# python manage.py makemessages -l en
# python manage.py compilemessages -l en
# STATIC_ROOT = BASE_DIR + '/static/'

# Comnetar al ejecutar la internacionalizacion
STATICFILES_DIRS = (
    BASE_DIR + '/static/',
    BASE_DIR + '/media/',
)

# Template files
TEMPLATE_DIRS = (
    BASE_DIR + '/templates',
)
