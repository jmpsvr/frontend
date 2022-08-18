FROM nginx
ENV TZ=Asia/Shanghai
RUN mkdir /app
COPY  ./dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3100