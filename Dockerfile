FROM node

RUN mkdir -p /app

ADD . /app

WORKDIR /app

RUN npm i -g grunt-cli bower
RUN npm i
RUN bower install --allow-root
RUN grunt serve

EXPOSE 3000

CMD ["node", "/app/app.js"]
