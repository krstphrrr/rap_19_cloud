# Stage 1: Build Angular app
FROM node:23-alpine3.21 AS build

WORKDIR /app
COPY package*.json ./
COPY webpack-patch.js ./
RUN npm install 
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx (minimal)
FROM nginx:alpine

COPY --from=build /app/dist/rangeland-analysis-platform/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
