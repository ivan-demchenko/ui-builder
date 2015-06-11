FROM nginx

RUN mkdir /srv/www

ADD app.conf /etc/nginx/sites-enabled/app.conf
ADD app.conf /etc/nginx/sites-available/app.conf
ADD nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD nginx
