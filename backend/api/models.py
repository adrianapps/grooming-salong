from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return self.name


class Dog(models.Model):
    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    age = models.IntegerField()
    photo = models.ImageField(upload_to="photos/", blank=True, null=True)

    def __str__(self):
        return self.name


class Visit(models.Model):
    date = models.DateTimeField()
    description = models.TextField(max_length=1000, blank=True, null=True)
    services = models.ManyToManyField(Service)
    dog = models.ForeignKey(Dog, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.dog: {self.services}}"
