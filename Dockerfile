FROM node:8 as builder
WORKDIR /home/node/app
COPY ./web/ /home/node/app
RUN yarn && yarn build

FROM php:7.2-fpm-alpine
RUN apk add imap-dev openldap-dev krb5-dev zlib-dev wget git fcgi libpng-dev \
    && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-install pdo_sqlite pdo imap zip mbstring bcmath opcache gd \
    && apk add autoconf \
        g++ \
        make \
    && pecl install apcu && docker-php-ext-enable apcu \
#cleanup
    && apk del autoconf g++ wget make \
    && rm -rf /tmp/* /var/cache/apk/* \
# composer
    && cd /usr/bin/ && wget -O composer https://getcomposer.org/download/1.6.3/composer.phar && chmod +x /usr/bin/composer \
# fix log path
    && sed -i "s/error_log.*/error_log = \/var\/log\/php7\.2\-fpm\.error.log/g" /usr/local/etc/php-fpm.d/docker.conf \
    && sed -i "s/access.log.*/access.log = \/var\/log\/php7\.2\-fpm\.access.log/g" /usr/local/etc/php-fpm.d/docker.conf \
    && ln -sf /proc/1/fd/1 /var/log/php7.2-fpm.access.log \
    && ln -sf /proc/1/fd/2 /var/log/php7.2-fpm.error.log
# change to www-data user
RUN rm -rf /var/www/* && chown www-data.www-data -R /var/www
USER www-data    

# install app
COPY --chown=www-data:www-data ./ /var/www
RUN cd /var/www && composer install && composer clearcache \
    && cat /dev/null > /var/www/.env

# install nginx
USER root
RUN apk add nginx \
    && mkdir /run/nginx
COPY services/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN ln -sf /proc/1/fd/1 /var/log/nginx/access.log \
    && ln -sf /proc/1/fd/2 /var/log/nginx/error.log

# supervisor
RUN apk add supervisor
RUN mkdir /etc/supervisor.d
COPY services/configs/webserver.conf /etc/supervisor.d/webserver.ini
COPY services/configs/webserver/php.conf  /etc/supervisor.d/webserver:php.ini
COPY services/configs/webserver/nginx.conf  /etc/supervisor.d/webserver:nginx.ini

#copy react app
COPY --from=builder /home/node/app/build/ /var/www/public/

# # rabbitmq
# RUN cd /tmp \
#     && wget -O rabbitmq.tar.gz https://github.com/ricbra/rabbitmq-cli-consumer/releases/download/1.4.2/rabbitmq-cli-consumer-linux-amd64.tar.gz \
#     && tar -xvf rabbitmq.tar.gz \
#     && mv rabbitmq-cli-consumer /usr/bin/ \
#     && cd / \
#     && rm -rf /tmp/* \
#     && mkdir /var/log/rabbitmq \
#     && mkdir /etc/rabbitmq-cli-consumer
# COPY services/configs/rabbitmq-cli-consumer.conf /etc/rabbitmq-cli-consumer/zipper.conf
# RUN ln -sf /proc/1/fd/1 /var/log/rabbitmq/info.log \
#     && ln -sf /proc/1/fd/2 /var/log/rabbitmq/error.log

ENV APP_ENV=prod
ENV DATABASE_URL=sqlite:///%kernel.project_dir%/var/data.db
WORKDIR /var/www

ENTRYPOINT ["supervisord", "-n", "-c", "/etc/supervisord.conf"]

EXPOSE 80

# HEALTHCHECK --interval=10s --timeout=3s \
#     CMD \
#     SCRIPT_FILENAME=/var/www/public/index.php \
#     DOCUMENT_ROOT=/var/www/public \
#     REQUEST_URI=/api/health \
#     REQUEST_METHOD=GET \
#     cgi-fcgi -bind -connect 127.0.0.1:9000 || exit 1
