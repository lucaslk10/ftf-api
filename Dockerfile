FROM node:16.3.0-alpine
WORKDIR /usr/src/app
RUN npm install -g yarn --force
COPY package.json ./
RUN yarn install
COPY .env ./
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]

