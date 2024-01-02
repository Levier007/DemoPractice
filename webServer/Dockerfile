FROM node:lts-alpine
WORKDIR /lwt
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node","server/index.js" ]