# Generated by Django 4.0.4 on 2022-05-03 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Addons',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addon_name', models.CharField(max_length=200)),
                ('addon_desctription', models.TextField()),
            ],
        ),
    ]
