FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git curl unzip zip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader && \
    php artisan config:clear && \
    php artisan cache:clear && \
    php artisan route:clear && \
    chmod -R 775 storage bootstrap/cache

EXPOSE 8080

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
