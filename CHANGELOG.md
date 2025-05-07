# Changelog

All notable changes to this project will be documented in this file.

## [1.2.1] - 2025-05-07

### Added

## [1.2.0] - 2025-05-06
- added PJ cover, invasive grass cover and sagebrush cover to trend component

### Added
- Added new endpoints for the 10m images:
  - > map tiles for vegetation-cover-10m, invasive-annual-grass-10m, pj-cover-10m, sagebrush-cover-10m. 

  - > The path to map tiles is 'usda-rap-tiles-cover-10m/{masked|unmasked}/{cover-class}'. The new timeseries endpoints are 'cover10m', 'coverMeteorology10m', 'gapCover10m', 'invasiveAnnualGrassCover10m', 'pjCover10m', and 'sagebrushCover10m'.

- Added changelog

- Added cover 10m toggle on the landcover control component

### Changed
- Runs Angular 19

- Updated dependencies to work with latest angular

- Changed maxNativeZoom to 20 from 12 to display images hi res when zooming in

- Changed order of toggles to Cover 30m, Cover 10m and Biomass


---