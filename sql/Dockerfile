FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD admin
ENV MYSQL_DATABASE babeldb
ENV MYSQL_USER mysql

ADD ./data-dev-init.sql /docker-entrypoint-initdb.d