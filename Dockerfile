FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir el proyecto
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 8083

# Comando para iniciar la aplicación
CMD [ "npm", "run", "serve" ]
