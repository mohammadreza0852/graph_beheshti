from import_export import resources
from ..models import Person, Vehicle, House

class PersonResource(resources.ModelResource):
    class Meta:
        model = Person
        skip_unchanged = True
        report_skipped = True
        exclude = ('id',)
        import_id_fields = ('name','phone_number','national_id')


class HouseResource(resources.ModelResource):
    class Meta:
        model = House
        skip_unchanged = True
        report_skipped = True
        exclude = ('id',)
        import_id_fields = ('post_number','address','price', 'area')


class VehicleResource(resources.ModelResource):
    class Meta:
        model = Vehicle
        skip_unchanged = True
        report_skipped = True
        exclude = ('id',)
        import_id_fields = ('manufacture_id','price')
