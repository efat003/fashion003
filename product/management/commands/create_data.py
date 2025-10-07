import requests
from django.utils.text import slugify
from django.core.management.base import BaseCommand

from product.models import Category, Product


class Command(BaseCommand):
    help = "Fetch products from fakestoreapi.com and insert into DB"

    def handle(self, *args, **options):
        print("Creating data.......")
        response = requests.get("https://fakestoreapi.com/products").json()

        for product in response:
            # Get or create category
            category_name = product.get("category", "Uncategorized")
            category, _ = Category.objects.get_or_create(
                title=category_name,
                slug=slugify(category_name)
            )

            # Create product
            Product.objects.create(
                category=category,
                title=product["title"],
                slug=slugify(product["title"]),
                price=product["price"],
                thumbnail=product["image"],
                description=product["description"],
            )

        print("Insertion complete!")
