from django.db import models
from django.utils.translation import gettext_lazy as _
from .nodes import Person, House, Vehicle
from django.db.models.functions import Cast
from django.db.models import Q

class CustomFilter(models.Model):

    class TypeChoices(models.TextChoices):
        House = 'House', _('house')
        Person = 'Person', _('person')
        Vehicle = 'Vehicle', _('vehicle')

    title = models.CharField(max_length=255, verbose_name=_('title'))
    first_node_type = models.CharField(choices=TypeChoices.choices, max_length=20, verbose_name=_('first node type'))
    second_node_type = models.CharField(choices=TypeChoices.choices, max_length=20, verbose_name=_('second node type'))
    min_relations = models.PositiveIntegerField(default=0)
    max_relations = models.PositiveIntegerField()

    @classmethod
    def filter_graph(cls, queryset, filter_id):
        custom_filter = cls.objects.get(id=filter_id)
        filtered_queryset = queryset.filter(
            first_node_type=custom_filter.first_node_type,
            second_node_type=custom_filter.second_node_type,
        ).annotate(node_count=models.Count('first_node_type')) \
            .filter(node_count__gte=custom_filter.min_relations,\
                 node_count__lte=custom_filter.max_relations)
        return filtered_queryset


class NodeCustomFilter(models.Model):

    class TypeChoices(models.TextChoices):
        House = 'House', _('house')
        Person = 'Person', _('person')
        Vehicle = 'Vehicle', _('vehicle')

    title = models.CharField(max_length=255, verbose_name=_('title'))
    node_type = models.CharField(choices=TypeChoices.choices, max_length=20, verbose_name=_('node type'))
    field_name = models.CharField(max_length=255, verbose_name=_('field name'))
    min_value = models.PositiveIntegerField(default=0)
    max_value = models.PositiveIntegerField()

    @classmethod
    def filter_graph(cls, queryset, filter_id):
        custom_filter = cls.objects.get(id=filter_id)
        node_ids = None
        if custom_filter.node_type == cls.TypeChoices.House:
            node_ids = House.objects.annotate(int_value=Cast(custom_filter.field_name, models.IntegerField()))\
                .filter(int_value__gte=custom_filter.min_value, int_value__lte=custom_filter.max_value).values_list('post_number', flat=True)
        if custom_filter.node_type == cls.TypeChoices.Person:
            node_ids = Person.objects.annotate(int_value=Cast(custom_filter.field_name, models.IntegerField()))\
                .filter(int_value__gte=custom_filter.min_value, int_value__lte=custom_filter.max_value).values_list('national_id', flat=True)
        if custom_filter.node_type == cls.TypeChoices.Vehicle:
            node_ids = Vehicle.objects.annotate(int_value=Cast(custom_filter.field_name, models.IntegerField()))\
                .filter(int_value__gte=custom_filter.min_value, int_value__lte=custom_filter.max_value).values_list('manufacture_id', flat=True)
        filtered_queryset = queryset.filter(
            Q(first_node_id__in=node_ids) & Q(second_node_id__in=node_ids)
        )
        return filtered_queryset
