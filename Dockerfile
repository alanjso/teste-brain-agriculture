FROM node:10

WORKDIR /usr

COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 4003

CMD ["pm2-runtime", "/usr/src/init.js"]