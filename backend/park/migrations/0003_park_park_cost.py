# Generated by Django 4.0.4 on 2022-05-09 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('park', '0002_park_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='park',
            name='park_cost',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=8),
        ),
    ]
