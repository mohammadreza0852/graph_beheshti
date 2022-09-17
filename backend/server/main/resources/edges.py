from import_export import resources
from ..models import Relation, Dataset

class RelationResource(resources.ModelResource):
    class Meta:
        model = Relation
        skip_unchanged = True
        report_skipped = True
        exclude = ('id',)
        import_id_fields = ('first_node_type','first_node_id','second_node_type', 'second_node_id', 'description')

    def after_import_instance(self, instance, new, **kwargs):
        filename = kwargs.get('file_name', 'unknown')
        self.dataset, created = Dataset.objects.get_or_create(filename=filename)
        print('hereeeee')


    def before_save_instance(self, instance, using_transactions, dry_run):
        print('hereeeeee 222222')
        if not dry_run:
            instance.dataset  = self.dataset     
