import json
import os
from django.http import JsonResponse
from django.shortcuts import render
from django.core.cache import cache
from .forms import LocacionForm
from .models import Region, Comuna
from django.template import loader


def cargar_datos_archivo_json():
    with open('regioncomuna.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        for region_data in data['regiones']:
            region, created = Region.objects.get_or_create(
                nombre=region_data['region'])
            for comuna_data in region_data['comunas']:
                Comuna.objects.create(nombre=comuna_data, region=region)


def obtener_regiones_y_comunas():
    regiones = cache.get('regiones')
    comunas = cache.get('comunas')

    if regiones is None or comunas is None:
        regiones = Region.objects.all()
        comunas = Comuna.objects.all()
        cache.set('regiones', regiones)
        cache.set('comunas', comunas)

    return regiones, comunas


def seleccionar_locacion(request):
    regiones = Region.objects.get_all_regions()
    comunas = Comuna.objects.get_all_comunas()

    if request.method == 'POST':
        form = LocacionForm(request.POST)
        if form.is_valid():
            region = form.cleaned_data['region']
            comuna = form.cleaned_data['comuna']
    else:
        form = LocacionForm()
    template_name = 'regioncomuna/form.html'

    return render(request, template_name, {'form': form, 'regiones': regiones, 'comunas': comunas})

def get_comunas(request):
    region_id = request.GET.get('region_id')
    comunas = Comuna.objects.filter(region_id=region_id).values('id', 'nombre')
    return JsonResponse(list(comunas), safe=False)

# cargar los datos del archivo JSON en la base de datos si aún no se han cargado
if not Region.objects.exists() and not Comuna.objects.exists() and os.path.exists('regioncomuna.json'):
    cargar_datos_archivo_json()
