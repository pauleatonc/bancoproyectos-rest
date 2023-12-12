# Etapa 1: Construir la aplicación React
FROM node:20 as build
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install -g dotenv-cli
COPY . .
RUN npm run build
RUN ls -l /app/dist

# Etapa 2: Configurar Nginx para servir la aplicación construida
FROM nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
