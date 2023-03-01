FROM node:alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]