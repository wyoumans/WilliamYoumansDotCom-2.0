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
  listen 443 ssl http2 default_server;
  listen [::]:443 ssl http2 default_server;
  access_log /var/log/nginx/www.williamyoumans.access.log;
  error_log  /var/log/nginx/www.williamyoumans.error.log debug;   log_subrequest on;
  server_name williamyoumans.com www.williamyoumans.com;

  ssl on;
  include snippets/ssl-williamyoumans.com.conf;
  include snippets/ssl-params.conf;

  if ($host = 'williamyoumans.com') {
    rewrite  ^/(.*)$  https://www.williamyoumans.com/$1  permanent;
  }

  # Compression
  gzip on;
  gzip_http_version  1.1;
  gzip_comp_level    5;
  gzip_min_length    256;
  gzip_proxied       any;
  gzip_vary          on;
  gzip_types
    application/atom+xml
    application/javascript
    application/json
    application/rss+xml
    application/vnd.ms-fontobject
    application/x-font-ttf
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    font/opentype
    image/svg+xml
    image/x-icon
    text/css
    text/plain
    text/x-component;
  # text/html is always compressed by HttpGzipModule

  location ~ ^/(fonts/|images/|scripts/|styles/|cache/|bower_components/|robots.txt|humans.txt|favicon.ico|\w+.png) {
    root /home/ubuntu/app/williamyoumans/public;
    access_log off;
    expires max;
  }

  location / {
    proxy_redirect off;
    proxy_cache_valid 200 6h;
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
