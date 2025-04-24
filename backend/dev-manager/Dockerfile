FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


WORKDIR /var/www/html

COPY . .

RUN composer install

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

CMD php artisan serve --host=0.0.0.0 --port=4040
