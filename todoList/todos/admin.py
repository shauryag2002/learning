from django.contrib import admin
from .models import Category, Tag, TodoItem

@admin.register(TodoItem)
class TodoItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'priority', 'is_completed', 'created_at')
    list_filter = ('is_completed', 'priority', 'category')
    search_fields = ('title', 'description')

admin.site.register(Category)
admin.site.register(Tag)