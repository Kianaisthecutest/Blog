FROM node:18-alpine

WORKDIR /app

# install production deps only
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]
