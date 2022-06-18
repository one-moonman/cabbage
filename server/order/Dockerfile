FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

CMD ["node", "index.js"]