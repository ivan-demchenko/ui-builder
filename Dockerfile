FROM node
MAINTAINER Ivan Demchenko <raqy.style@gmail.com>

RUN npm install -g grunt-cli bower

RUN mkdir /app

ADD package.json /app/package.json
RUN cd /app && npm install

ADD bower.json /app/bower.json
RUN cd /app && bower install --config.interactive=false --allow-root

ADD . /app

WORKDIR /app
EXPOSE 3000 35729
CMD ["grunt", "serve"]
