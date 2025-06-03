FROM node:20-alpine

WORKDIR /usr/src/app

# Install OpenSSL and other required dependencies
RUN apk add --no-cache openssl postgresql-client

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

RUN npm install -g ts-node typescript

COPY . .

EXPOSE 3000




CMD ["npm", "run", "dev:docker"]