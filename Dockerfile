FROM node
MAINTAINER Ivan Demchenko <raqy.style@gmail.com>

RUN npm install -g grunt-cli bower

RUN mkdir /app

ADD package.json /app/package.json
RUN cd /app && npm install

ADD . /app

WORKDIR /app
EXPOSE 1337 3000 3001 35729
CMD ["grunt", "serve"]
