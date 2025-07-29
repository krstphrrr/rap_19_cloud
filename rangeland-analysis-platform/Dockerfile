# Stage 1: Build Angular app
FROM node:22-alpine3.21 AS compile-image

WORKDIR /opt/ng
COPY ./src ./src
COPY ./package*.json ./tsconfig*.json /angular.json ./

# COPY webpack-patch.js ./
RUN npm ci && \
    npm install -g @angular/cli && \ 
    npm run build --configuration=production

# Stage 2: Serve with Nginx 
FROM nginx:latest

COPY --from=compile-image /opt/ng/dist/rangeland-analysis-platform/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
