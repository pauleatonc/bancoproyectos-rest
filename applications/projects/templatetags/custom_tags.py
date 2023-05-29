from django import template

register = template.Library()

@register.filter
def get_file_extension(value):
    return value.split('.')[-1]