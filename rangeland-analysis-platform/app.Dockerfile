FROM node:16-alpine AS build
WORKDIR /usr/src/app
# COPY ./rangeland-analysis-platform/package*.json ./
COPY ./rangeland-analysis-platform ./
# RUN npm install

# RUN npm install
# COPY . .
RUN npm run build
# CMD ["tail", "-f", "/dev/null"]

FROM nginx:1.23.2-alpine
COPY ./rangeland-analysis-platform/nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=build /usr/src/app/dist/* /usr/share/nginx/html
