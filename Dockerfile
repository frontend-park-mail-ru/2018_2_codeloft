FROM ubuntu:16.04
MAINTAINER User (email@mail.com)

RUN apt-get update -y
RUN apt-get install -y nginx curl supervisor
RUN chown -R www-data:www-data /var/lib/nginx

COPY /etc/nginx/sites-available/codeloft.conf /etc/nginx/sites-enabled/
COPY /etc/nginx/nginx.conf /etc/nginx/
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf

RUN rm -rf /var/www/html/
RUN mkdir -p /var/www/html/
RUN mkdir -p /var/www/html/src
COPY src /var/www/html

CMD ["nginx"]
