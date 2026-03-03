FROM php:8.3-apache

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    libssl-dev \
    unzip \
    git \
    curl \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Ativa módulos Apache
RUN a2enmod rewrite headers

# Configura diretório do Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf

WORKDIR /var/www/html

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia apenas os arquivos do Composer
COPY composer.json composer.lock ./

# Instala dependências dentro do container
RUN composer install --no-dev --optimize-autoloader

# Copia o restante do projeto
COPY . .

EXPOSE 80