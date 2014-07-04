upstream williamyoumans {
  server 127.0.0.1:4321;
  keepalive 64;
}

server {
  listen 80;
  access_log /var/log/nginx/www.williamyoumans.access.log;
  error_log  /var/log/nginx/www.williamyoumans.error.log debug;   log_subrequest on;
  server_name williamyoumans.com www.williamyoumans.com;

  if ($host = 'williamyoumans.com' ) {
    rewrite  ^/(.*)$  http://www.williamyoumans.com/$1  permanent;
  }

  location ~ ^/(fonts/|images/|scripts/|styles/|bower_components/|robots.txt|humans.txt|favicon.ico|\w+.png) {
    root /home/william/app/williamyoumans/public;
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
