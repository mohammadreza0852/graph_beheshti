# Generated by Django 4.0.4 on 2022-08-25 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_relation'),
    ]

    operations = [
        migrations.AddField(
            model_name='relation',
            name='description',
            field=models.CharField(max_length=255, null=True, verbose_name='description'),
        ),
    ]