# Generated by Django 4.0.4 on 2022-05-03 19:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('address', '0001_initial'),
        ('customer', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='addressId',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='address.address'),
        ),
    ]
