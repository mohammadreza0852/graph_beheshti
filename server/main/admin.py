from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from .models import House, Person, Vehicle, Relation


class HouseAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'post_number',
        'price',
    )
    list_filter = (
        'post_number',
        'price',
    )


class PersonAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'name',
        'phone_number',
        'national_id',
    )
    list_filter = (
        'name',
        'phone_number',
        'national_id',
    )


class VehicleAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'manufacture_id',
        'price',
    )
    list_filter = (
        'manufacture_id',
        'price',
    )


class RelationAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'first_node_type',
        'first_node_id',
        'second_node_type',
        'second_node_id',
    )
    list_filter = (
        'first_node_type',
        'first_node_id',
        'second_node_type',
        'second_node_id',
    )


admin.site.register(House, HouseAdmin)
admin.site.register(Person, PersonAdmin)
admin.site.register(Vehicle, VehicleAdmin)
admin.site.register(Relation, RelationAdmin)
