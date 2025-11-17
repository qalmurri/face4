from django.db import models

class Purpose(models.Model):
    id = models.AutoField(
        primary_key=True
    )

    code = models.CharField(
        max_length=50,
        unique=True
    )

    name = models.CharField(
        max_length=100
    )


class Destination(models.Model):
    id = models.AutoField(
        primary_key=True
    )

    code = models.CharField(
        max_length=50,
        unique=True
    )
    
    name = models.CharField(
        max_length=100
    )