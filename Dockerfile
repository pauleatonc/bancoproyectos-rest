# Etapa 1: Construir la aplicación React
FROM node:20 as build
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install -g dotenv-cli
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]
