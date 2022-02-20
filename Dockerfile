FROM node:16-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install 


COPY . .

EXPOSE 3000
CMD ["npm", "start"]