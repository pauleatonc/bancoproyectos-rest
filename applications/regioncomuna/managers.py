from django.db import models


class RegionManager(models.Manager):
    def get_all_regions(self):
        return self.all()


class ComunaManager(models.Manager):
    def get_all_comunas(self):
        return self.all()
