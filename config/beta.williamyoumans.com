upstream betawilliamyoumans {
  server 127.0.0.1:3000;
  keepalive 64;
}

server {
  listen 80;
  access_log /var/log/nginx/beta.williamyoumans.access.log;
  error_log  /var/log/nginx/beta.williamyoumans.error.log debug;   log_subrequest on;
  server_name beta.williamyoumans.com;
  add_header "X-UA-Compatible" "IE=Edge,chrome=1";

  location ~ ^/(fonts/|images/|scripts/|styles/|bower_components/|robots.txt|humans.txt|favicon.ico|\w+.png) {
    root /home/william/app/beta/public;
    access_log off;
    expires max;
  }

  location / {
    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;

    proxy_redirect off;
    proxy_cache_valid 200 24h;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_cache one;
    proxy_cache_key "$host$request_uri$query_string";

    proxy_http_version 1.1;
    proxy_pass http://betawilliamyoumans;
  }
}
