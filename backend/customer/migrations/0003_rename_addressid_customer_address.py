# Generated by Django 4.0.4 on 2022-05-04 16:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0002_alter_customer_addressid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='addressId',
            new_name='address',
        ),
    ]