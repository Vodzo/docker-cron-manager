FROM node:8 as builder
WORKDIR /home/node/app
COPY ./web/ /home/node/app
ENV PUBLIC_URL=/app
ENV REACT_APP_GRAPHQL_ENDPOINT=/api/graphql
RUN yarn && yarn build

FROM php:7.2-fpm-alpine
RUN apk add imap-dev openldap-dev krb5-dev zlib-dev wget git fcgi libpng-dev sudo ca-certificates \
    && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-install imap zip bcmath opcache gd sockets \
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

# setup php.ini overrides
COPY docker/php/ /usr/local/etc/php/conf.d/

# install app
COPY --chown=www-data:www-data ./api/ /var/www
RUN cd /var/www && composer install && composer clearcache \
    && bin/console doctrine:schema:create \
    && cat /dev/null > /var/www/.env \
    && mkdir /var/www/var/data \
    && mv /var/www/var/data.db /var/www/var/data/db.db

# install nginx
USER root
RUN apk add nginx \
    && mkdir /run/nginx
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# RUN ln -sf /proc/1/fd/1 /var/log/nginx/access.log \
#     && ln -sf /proc/1/fd/2 /var/log/nginx/error.log

# supervisor
RUN apk add supervisor
RUN mkdir /etc/supervisor.d
COPY docker/supervisor/webserver.conf /etc/supervisor.d/webserver.ini
COPY docker/supervisor/webserver/php.conf  /etc/supervisor.d/webserver:php.ini
COPY docker/supervisor/webserver/nginx.conf  /etc/supervisor.d/webserver:nginx.ini
COPY docker/supervisor/webserver/crond.conf  /etc/supervisor.d/webserver:crond.ini
COPY docker/supervisor/supervisord.conf /etc/supervisord.conf

# setup cronjob
RUN ln -sf /proc/1/fd/1 /var/log/jobby.log
RUN echo "*       *       *       *       *       /usr/local/bin/php -f /var/www/bin/console cron:run > /var/log/jobby.log 2>&1" | crontab -

#copy react app
COPY --from=builder /home/node/app/build/ /var/www/public/app/

# symlink jobby debug to docker log
# RUN ln -sf /proc/1/fd/1 /var/www/var/log/default_jobby_out.log \
#     && ln -sf /proc/1/fd/2 /var/www/var/log/default_jobby_err.log

ENV APP_ENV=prod
ENV DATABASE_URL=sqlite:///%kernel.project_dir%/var/data/db.db
ENV CORS_ALLOW_ORIGIN=^https?://localhost(:[0-9]+)?$
ENV LOG_ROTATE_SIZE=12MB
ENV DATE_TIMEZONE=UTC

WORKDIR /var/www

ENTRYPOINT ["supervisord", "-n", "-c", "/etc/supervisord.conf"]

VOLUME ["/var/www/var/data"]

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s \
    CMD \
    SCRIPT_FILENAME=/var/www/public/index.php \
    DOCUMENT_ROOT=/var/www/public \
    REQUEST_URI=/api/health \
    REQUEST_METHOD=GET \
    cgi-fcgi -bind -connect 127.0.0.1:9000 || exit 1
