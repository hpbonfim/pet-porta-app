
server {
  server_name localhost;
  listen 80 default_server;

  # Serve static assets from this folder
  root /dist;

  location / {
    try_files $uri @yournodeapp;
  }

  upstream yournodeapp {
    server localhost:3001 fail_timeout=0;
    keepalive 60;
  }
  
  location @yournodeapp {
    proxy_pass http://yournodeapp;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
