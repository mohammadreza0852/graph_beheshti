# Generated by Django 4.0.4 on 2022-10-22 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_alter_nodeimage_node_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nodeimage',
            name='node_type',
            field=models.CharField(choices=[('House', 'house'), ('Person', 'person'), ('Vehicle', 'vehicle')], max_length=255, unique=True, verbose_name='node type'),
        ),
    ]
