FROM node:alpine 

WORKDIR /opt/app

COPY ./package.json ./

RUN npm install

RUN npm install nodemon --global

COPY ./ ./

CMD npm run start
