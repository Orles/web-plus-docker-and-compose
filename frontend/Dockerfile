FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Устанавливаем зависимости
RUN npm i
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

FROM nginx:1.23.1-alpine
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/conf.d /etc/nginx/conf.d
ENTRYPOINT ["nginx", "-g", "daemon off;"]