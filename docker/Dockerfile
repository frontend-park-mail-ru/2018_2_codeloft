# TODO: add image
FROM <REGISTRY>

ARG BUILD

RUN apt-get update -y
RUN apt-get install -y nginx curl supervisor
RUN chown -R www-data:www-data /var/lib/nginx

RUN curl -sL https://deb.nodesource.com/setup_9.x | bash
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

COPY /etc/nginx/sites-available/your-app-${BUILD}.conf /etc/nginx/sites-enabled/
COPY /etc/nginx/nginx.conf /etc/nginx/

RUN rm -rf /var/www/html/*
RUN mkdir -p /var/www/frontend/
RUN mkdir -p /var/www/html/
COPY . /var/www/frontend/
WORKDIR /var/www/frontend
RUN npm install
RUN npm run build:${BUILD}
RUN cp -r /var/www/frontend/dist/* /var/www/html/

CMD ["nginx"]
