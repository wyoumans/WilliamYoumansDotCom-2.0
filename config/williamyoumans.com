upstream williamyoumans {
  server 127.0.0.1:4321;
  keepalive 64;
}

server {
  listen 80;
  server_name williamyoumans.com www.williamyoumans.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 default_server ssl;
  access_log /var/log/nginx/www.williamyoumans.access.log;
  error_log  /var/log/nginx/www.williamyoumans.error.log debug;   log_subrequest on;
  server_name williamyoumans.com www.williamyoumans.com;

  ssl on;
  ssl_certificate /etc/nginx/ssl/williamyoumans_com/ssl-bundle.crt;
  ssl_certificate_key /etc/nginx/ssl/williamyoumans_com/williamyoumans.key;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

  if ($host = 'williamyoumans.com') {
    rewrite  ^/(.*)$  https://www.williamyoumans.com/$1  permanent;
  }

  location ~ ^/(fonts/|images/|scripts/|styles/|cache/|bower_components/|robots.txt|humans.txt|favicon.ico|\w+.png) {
    root /home/ubuntu/app/williamyoumans/public;
    access_log off;
    expires max;
  }

  location / {
    proxy_redirect off;
    proxy_cache_valid 200 24h;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_cache one;
    proxy_cache_key "$host$request_uri$query_string";

    proxy_http_version 1.1;
    proxy_pass http://williamyoumans;
  }
}
