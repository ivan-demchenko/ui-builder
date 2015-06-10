FROM node

RUN mkdir -p /app

ADD ./package.json /app/package.json
ADD ./nodemon.json /app/nodemon.json

WORKDIR /app
ADD . /app

RUN npm i -g nodemon pm2 grunt-cli bower
RUN npm i

EXPOSE 3000

CMD ["nodemon", "/app/app.js"]
