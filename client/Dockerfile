FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

COPY .override.env .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]