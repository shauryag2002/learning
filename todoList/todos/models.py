from django.db import models

# ry drafting the models:
# A Category model (name).
# A Tag model (name).
# A TodoItem model with:
# title (CharField)
# description (TextField, optional/blank)
# is_completed (BooleanField, defaults to False)
# priority (CharField with choices: 'LOW', 'MEDIUM', 'HIGH')
# category (ForeignKey to Category, nullable if optional)
# tags (ManyToManyField to Tag, blank=True)
# created_at (DateTimeField, auto_now_add=True)
# Give writing todos/models.py a try, or let me know if you want me to explain choices or fields in more detail first!

class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class TodoItem(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=20, choices=[('LOW', 'Low'), ('MEDIUM', 'Medium'), ('HIGH', 'High')], default='MEDIUM')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title


# Create your models here.
