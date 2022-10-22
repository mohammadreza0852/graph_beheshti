from django.db import models
from django.utils.translation import gettext_lazy as _


class NodeImage(models.Model):

    class TypeChoices(models.TextChoices):
        House = 'House', _('house')
        Person = 'Person', _('person')
        Vehicle = 'Vehicle', _('vehicle')

    node_type = models.CharField(max_length=255, unique=True, verbose_name=_('node type'), choices=TypeChoices.choices)
    image = models.ImageField(_("image"), upload_to='images/')
