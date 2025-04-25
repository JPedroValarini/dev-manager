FROM php:8.2-fpm

# Cache de dependências (etapa separada para otimização)
RUN apt-get update && apt-get install -y \
    build-essential libpq-dev libzip-dev zip unzip git curl \
    && docker-php-ext-install pdo pdo_pgsql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Instala dependências primeiro (cacheável)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader

# Copia o resto e gera autoload
COPY . .
RUN composer dump-autoload --optimize

# Permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

CMD php artisan serve --host=0.0.0.0 --port=4040