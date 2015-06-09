FROM node

RUN mkdir /ui-builder-app

RUN npm install nodemon pm2 grunt-cli bower -g

WORKDIR /ui-builder-app

ADD ./package.json /ui-builder-app/package.json

RUN npm install

ADD ./nodemon.json /ui-builder-app/nodemon.json

EXPOSE 3000

CMD grunt
CMD node app.js
