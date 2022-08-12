from django.db import models
from django.utils.translation import gettext_lazy as _

class House(models.Model):
    post_number = models.CharField(max_length=16, unique=True, verbose_name=_('post_number'))
    address = models.CharField(max_length=255, null=True, verbose_name=_('address'))
    area = models.IntegerField(null=True, verbose_name=_('area'))
    price = models.IntegerField(null=True, verbose_name=_('price'))

    class Meta:
        verbose_name = _('house')
        verbose_name_plural = _('houses')


class Vehicle(models.Model):
    manufacture_id = models.CharField(max_length=20, unique=True, verbose_name=_('manufacture_id'))
    price = models.IntegerField(null=True, verbose_name=_('price'))

    class Meta:
        verbose_name = _('vehicle')
        verbose_name_plural = _('vehicles')


class Person(models.Model):
    name = models.CharField(max_length=255, null=True, verbose_name=_('name'))
    phone_number = models.CharField(max_length=15, null=True, verbose_name=_('phone_number'))
    national_id = models.CharField(max_length=20, unique=True, verbose_name=_('national_id'))

    class Meta:
        verbose_name = _('person')
        verbose_name_plural = _('persons')
    
