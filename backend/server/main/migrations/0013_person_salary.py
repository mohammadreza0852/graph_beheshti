# Generated by Django 4.0.4 on 2022-12-15 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_nodecustomfilter_alter_customfilter_max_relations'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='salary',
            field=models.PositiveIntegerField(default=2000000, verbose_name='salary'),
            preserve_default=False,
        ),
    ]
