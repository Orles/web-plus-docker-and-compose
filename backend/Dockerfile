FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Устанавливаем зависимости
RUN npm i
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

FROM node:16-alpine as production
WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev 

COPY --from=builder /app/dist ./dist/

RUN npm i pm2 -g

COPY ./ecosystem.config.js ./
ENTRYPOINT ["pm2-runtime", "start", "ecosystem.config.js"]

# Указываем команду для запуска приложения