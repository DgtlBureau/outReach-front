FROM node AS builder
WORKDIR /app
COPY ./ ./
RUN yarn
RUN yarn build

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
