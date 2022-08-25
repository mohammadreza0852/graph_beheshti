from django.contrib import admin

from .models import House, Person, Vehicle, Relation

admin.site.register(House)
admin.site.register(Person)
admin.site.register(Vehicle)
admin.site.register(Relation)
