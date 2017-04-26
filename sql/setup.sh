#!/bin/bash
/etc/init.d/mysql start
mysql -u root < /tmp/createDB.sql
mysql -u root < /tmp/insertData.sql