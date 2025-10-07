from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)  # ✅ add title field
    slug = models.SlugField(unique=True, blank=True, null=True)  # ✅ add slug field
    price = models.DecimalField(max_digits=10, decimal_places=2)
    thumbnail = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class Slider(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="sliders/")
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
