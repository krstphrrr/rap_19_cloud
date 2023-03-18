## Updates


### rap_node: 1.0.2
- changes to wording, small tweaks to templates

### rap_app:1.0.6
- added default year 2022

### rap_node: 1.0.1
- added support assets

### rap_app: 1.0.5 
- added `blank.png` to assets
- 

### rap_node: 1.0.0 
- containerized node app that serves the same html templates as the ruby app

### rap_app: 1.0.4
- added usda/jornada watermarks to map
- changed `npm i` to `npm ci`

### rap_app: 1.0.3
- manually fixed imports on deprecated `ngx-tour-core` and `ngx-tour-md-menu` packages which install with some errors that break compilation/build inside docker container.
- updated `JSON` package to fix circular imports bug when importing geometry.
- removed `Great Plains Conservation` and `Sagebrush Conservation` components.

### rap_app: 1.0.2
- added the legacy peer deps flag to dockerfile to not have to copy the an external `node_modules` directory into the container.
- added the common module into `app.module.ts` to resolve templating bailouts
- changed api keys for google maps 
- switched tile urls to usda ones
note: if using nvm to use deprecated versions of npm/node, be wary of `lockFileVersion` (this app will work with 3, but older npm creates 1 or 2) inside the `package-lock.json` file

### rap_app: 1.0.1 
- included url segment in ng build statement within package.json. [commit](https://github.com/Landscape-Data-Commons/rap_stack/blob/166ba8633ffe6413258399210070fd8d8ec41099/rangeland-analysis-platform/package.json#L8)

## Setup 

Docker compose initializes two docker containers:
  1. rap_app (/rangeland-analysis-platform/app.Dockerfile):
    - node 16 container 
    - angular 8.2.14
    - typescript: 3.5.3
    - package-lock.json: 3

  2. rap_landing (rap-landing-page\landing.Dockerfile):
    - jekyll container (latest)
    - sets up jekyll/ruby app and serves it internally on port 4000 (which is then proxied through nginx)
    
to run:
```sh
docker stack deploy %name-of-stack% --compose-file ~./docker-compose.yml
```

