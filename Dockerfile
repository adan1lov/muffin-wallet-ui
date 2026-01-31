FROM node:18-alpine

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем исходный код, создаем .env и собираем приложение
COPY . .
RUN echo "REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL" > .env && \
    npm run build && \
    npm install -g serve && \
    ls -la build/

EXPOSE 3000

CMD ["serve", "-s", "build"]