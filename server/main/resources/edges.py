from import_export import resources
from ..models import Relation

class RelationResource(resources.ModelResource):
    class Meta:
        model = Relation
        skip_unchanged = True
        report_skipped = True
        exclude = ('id',)
        import_id_fields = ('first_node_type','first_node_id','second_node_type', 'second_node_id', 'description')
