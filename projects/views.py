from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Banco de Proyectos %s.")


def search(request):
    return HttpResponse("Buscador de proyectos: %s." )


def project(request, project_id):
    return HttpResponse("Proyecto específico: %s." % project_id)
