FROM node:8 as builder
WORKDIR /home/node/app
COPY ./web/ /home/node/app
ENV PUBLIC_URL=/app
ENV REACT_APP_GRAPHQL_ENDPOINT=/api/graphql
RUN yarn && yarn build

FROM php:7.2-fpm-alpine
RUN apk add imap-dev openldap-dev krb5-dev zlib-dev wget git fcgi libpng-dev \
    && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-install pdo imap zip mbstring bcmath opcache gd \
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
#    && ln -sf /proc/1/fd/1 /var/log/php7.2-fpm.access.log \ # skip access log because its copy of nginx access log
    && ln -sf /proc/1/fd/2 /var/log/php7.2-fpm.error.log
# change to www-data user
RUN rm -rf /var/www/* && chown www-data.www-data -R /var/www
USER www-data    

# install app
COPY --chown=www-data:www-data ./api/ /var/www
RUN cd /var/www && composer install && composer clearcache \
    && bin/console doctrine:schema:create \
    && cat /dev/null > /var/www/.env

# install nginx
USER root
RUN apk add nginx \
    && mkdir /run/nginx
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN ln -sf /proc/1/fd/1 /var/log/nginx/access.log \
    && ln -sf /proc/1/fd/2 /var/log/nginx/error.log

# supervisor
RUN apk add supervisor
RUN mkdir /etc/supervisor.d
COPY docker/supervisor/webserver.conf /etc/supervisor.d/webserver.ini
COPY docker/supervisor/webserver/php.conf  /etc/supervisor.d/webserver:php.ini
COPY docker/supervisor/webserver/nginx.conf  /etc/supervisor.d/webserver:nginx.ini

#copy react app
COPY --from=builder /home/node/app/build/ /var/www/public/app/

# symlink jobby debug to docker log
RUN ln -sf /proc/1/fd/1 /var/www/var/log/default_jobby_out.log \
    && ln -sf /proc/1/fd/2 /var/www/var/log/default_jobby_err.log

ENV APP_ENV=prod
ENV DATABASE_URL=sqlite:///%kernel.project_dir%/var/data.db
ENV RABBITMQ_URL=amqp://guest:guest@localhost:5672
ENV CORS_ALLOW_ORIGIN=^https?://localhost(:[0-9]+)?$
ENV LOG_ROTATE_SIZE=12MB

WORKDIR /var/www

ENTRYPOINT ["supervisord", "-n", "-c", "/etc/supervisord.conf"]

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s \
    CMD \
    SCRIPT_FILENAME=/var/www/public/index.php \
    DOCUMENT_ROOT=/var/www/public \
    REQUEST_URI=/api/health \
    REQUEST_METHOD=GET \
    cgi-fcgi -bind -connect 127.0.0.1:9000 || exit 1
