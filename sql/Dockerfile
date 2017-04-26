FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD admin
ENV MYSQL_DATABASE babeldb
ENV MYSQL_USER mysql

ADD ./* /tmp/

RUN chmod +x /tmp/setup.sh
RUN /tmp/setup.sh