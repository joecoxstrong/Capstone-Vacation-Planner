# Generated by Django 4.0.4 on 2022-05-03 19:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('addon', '0002_rename_addons_addon'),
    ]

    operations = [
        migrations.RenameField(
            model_name='addon',
            old_name='addon_desctription',
            new_name='addon_description',
        ),
    ]