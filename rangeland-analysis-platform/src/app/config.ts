export const TourConfig = [
  {
    anchorId: 'select-cover-type',
    content: `Toggle cover and biomass layers, choose a group, and year. Map
      layer will change accordingly.`,
    enableBackdrop: true
  },
  {
    anchorId: 'toggle-rangeland-mask',
    content: `This toggle will exclude predefined areas
      considered croplands, developed areas, and water from
      the view and analysis. This allows the user to focus
      model results primarily on rangelands. Please inspect your
      area of interest to make sure exclusion works as
      expected.`,
    enableBackdrop: true
  },
  {
    anchorId: 'draw-polygons',
    content: `Click here to draw features on the map to
    analyze. Features may include points, lines, or
    polygons. Up to 50 features can be analyzed at a time.`,
    enableBackdrop: true
  },
  {
    anchorId: 'upload-shapefile',
    content: `Click here to upload a shapefile of features
    for an area of interest. The shapefile must first be
    saved as a .zip file and contain the .shp, .shx, and
    .prj files of the shapefile.`,
    enableBackdrop: true
  },
  /*({
    anchorId: 'calculate-time-series',
    content: `Click here to calculate a time series graph
    of selected features. If multiple features are present,
    click on a feature to view its time series. Click the
    fullscreen button  to enlarge the graph.`,
    enableBackdrop: true
  },*/
  // {
  //   anchorId: 'share-map',
  //   content: `Generate a shareable URL to return to the map
  //   in view (not available for drawn or uploaded features)`,
  //   enableBackdrop: true
  // },
]
