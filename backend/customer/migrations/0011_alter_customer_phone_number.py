# Generated by Django 4.0.4 on 2022-05-12 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0010_remove_customer_address_customer_city_customer_state_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.CharField(max_length=17),
        ),
    ]
