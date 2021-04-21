# Generated by Django 3.2 on 2021-04-20 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SensorValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('snesor_type', models.CharField(choices=[('TMP', 'Temperature'), ('HUM', 'Huidity')], default='TMP', max_length=3)),
                ('value', models.FloatField()),
            ],
        ),
    ]
