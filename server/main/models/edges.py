from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .nodes import House, Person, Vehicle

class Relation(models.Model):
    
    class TypeChoices(models.TextChoices):
        House = 'House', _('house')
        Person = 'Person', _('person')
        Vehicle = 'Vehicle', _('vehicle')

    first_node_type = models.CharField(choices=TypeChoices.choices, max_length=20, verbose_name=_('first node type'))
    first_node_id = models.CharField(max_length=255, verbose_name=_('first node id'))
    second_node_type = models.CharField(choices=TypeChoices.choices, max_length=20, verbose_name=_('second node type'))
    second_node_id = models.CharField(max_length=255, verbose_name=_('second node id'))
    description = models.CharField(max_length=255, verbose_name=_('description'), null=True)

    def save(self, *args, **kwargs):
        if not (self.check_for_node_ids(self.first_node_id, self.first_node_type) \
             and self.check_for_node_ids(self.second_node_id, self.second_node_type)):
                raise serializers.ValidationError({'detail': _('node id doesn\'t exist.')}, code=400)
        super().save(*args, **kwargs)

    def check_for_node_ids(self, node_id, node_type):
        if node_type == self.TypeChoices.House and House.objects.filter(post_number=node_id).exists():
            return True
        if node_type == self.TypeChoices.Person and Person.objects.filter(national_id=node_id).exists():
            return True
        if node_type == self.TypeChoices.Vehicle and Vehicle.objects.filter(manufacture_id=node_id).exists():
            return True
        return False            

    class Meta:
        verbose_name = _('Relation')
        verbose_name_plural = _('Relations')
