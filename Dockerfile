FROM python:3.11.0

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1
# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Instalar dependencias de sistema necesarias para psycopg2-binary
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    gcc \
    postgresql \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


# Copiar requirements.txt e instalar dependencias
COPY requirements.txt /app/
RUN pip3 install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación al contenedor
COPY . /app/

# Variable de entorno para apuntar a dev.py
ENV DJANGO_SETTINGS_MODULE=projectbank.settings.dev

# Especificar el comando para ejecutar la aplicación
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]