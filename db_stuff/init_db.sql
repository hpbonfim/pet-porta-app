CREATE DATABASE IF NOT EXISTS mysql;
GRANT ALL PRIVILEGES on mysql.*
TO 'awesomeness'@'%' IDENTIFIED BY 'lamepassword'
WITH GRANT OPTION;