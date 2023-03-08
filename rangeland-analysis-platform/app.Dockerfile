FROM node:16-alpine AS build
WORKDIR /usr/src/app
# COPY ./rangeland-analysis-platform/package*.json ./
COPY ./rangeland-analysis-platform ./

RUN npm install --legacy-peer-deps

COPY ./rangeland-analysis-platform/ngx-tour-fix/tour.service.d.ts /usr/src/app/node_modules/ngx-tour-core/lib/tour.service.d.ts
COPY ./rangeland-analysis-platform/ngx-tour-fix/tour-anchor.directive.d.ts /usr/src/app/node_modules/ngx-tour-md-menu/lib/tour-anchor.directive.d.ts

RUN npm run build
# CMD ["tail", "-f", "/dev/null"]

FROM nginx:1.23.2-alpine
COPY ./rangeland-analysis-platform/nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=build /usr/src/app/dist/* /usr/share/nginx/html
