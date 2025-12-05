# -------- Etapa de construcción (Angular) --------
FROM node:20-alpine AS build-step
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration production

# -------- Etapa de producción (Nginx) --------
FROM nginx:1.17.1-alpine

# Copiamos el build generado a la carpeta pública de Nginx
COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
