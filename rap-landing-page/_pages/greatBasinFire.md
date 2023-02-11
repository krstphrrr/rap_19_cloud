---
title: "Great Basin rangeland fire probability"
description: "Rangeland Analysis Platform Great Basin fire probability"
layout: single
classes: wide
author_profile: false
permalink: /great-basin-fire/
---

*Updated September 24, 2022*

*This page has been updated to include the most recent modeling efforts described in [Smith et al. (2022)](https://doi.org/10.1016/j.rama.2022.07.005).*

<h3>Where are large fires most likely to occur throughout the year given an
ignition?</h3>

This map represents the relative probability of large (> 1,000 acres) rangeland
fire given an ignition. Probabilities are for the entire year or fire season.
The map should be used alongside other fire risk or prediction services.
Probabilities are calculated using RAP biomass, RAP cover, and various
climate/drought indices. Maps are available in early March.

![Great Basin rangeland fire
probability](/assets/images/great-basin-fire/probability_2022_doy_065.png)

<!-- Load Leaflet from CDN -->
<!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
  crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
  crossorigin=""></script> -->

<!-- Load Esri Leaflet from CDN -->
<!-- <script src="https://unpkg.com/esri-leaflet@3.0.2/dist/esri-leaflet.js"
  integrity="sha512-myckXhaJsP7Q7MZva03Tfme/MSF5a6HC2xryjAM4FxPLHGqlh5VALCbywHnzs2uPoF/4G/QVXyYDDSkp5nPfig=="
  crossorigin=""></script>

<link href="https://cdn.jsdelivr.net/npm/leaflet.control.opacity@1.5.0/dist/L.Control.Opacity.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/leaflet.control.opacity@1.5.0/dist/L.Control.Opacity.min.js"></script>

<style>
  #map { height: 600px; }
</style>

<h3>2021 wildland fire perimeters</h3>

WFIGS 2021 Wildland Fire Perimeters to Date - provided by 
[NIFC](https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-2021-wildland-fire-perimeters-to-date/about)

<div id="map"></div>

<script>
  var map = L.map('map').setView([40.5, -117.0], 6);

  L.esri.basemapLayer('Topographic').addTo(map);

  var probability = L.tileLayer('https://storage.googleapis.com/great-basin-forecast/2021/{z}/{x}/{y}.png',
    {maxNativeZoom: 13}).addTo(map);
  
  var fires = L.esri.featureLayer({
    url: 'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/CY_WildlandFire_Perimeters_ToDate/FeatureServer/0',
    where: "poly_FeatureCategory = 'Wildfire Daily Fire Perimeter'"
  }).setStyle({
    color: 'purple'
  }).addTo(map);
  
  var overlayMaps = {
    "Rangeland fire probability": probability
  };
  
  var overlayFires = {
    "2021 wildand fire perimeters": fires
  }
  
  L.control.layers(overlayMaps, overlayFires, {
    collapsed: true,
    }).addTo(map);
  
  L.control.opacity(overlayMaps, {
    label: '',
    collapsed: false,
  }).addTo(map);
  
  fires.bindPopup(function (layer) {
    
    Date.prototype.formatMMDDYYYY = function(){
      return (this.getMonth() + 1) + 
      "/" +  this.getDate() +
      "/" +  this.getFullYear();
    }
    
    return L.Util.template('<p><strong>{poly_IncidentName}</strong><br>' + 
      parseInt(layer.feature.properties.poly_Acres_AutoCalc) + ' acres <br>' +
      new Date(parseInt(layer.feature.properties.irwin_FireDiscoveryDateTime)).formatMMDDYYYY(), 
      layer.feature.properties);
  });

</script> -->


<h3>How does this year compare to the past?</h3>

There is a clear relationship between the area-wide average fire probability
across the Great Basin in the month of March and the total area burned that year
(see figure below). 2022 is shown as a yellow dot and represents a coarse
prediction of the total area burned for 2022. This allows us to compare how the
coming fire season might relate to past years in terms of total area burned.
This prediction, however, entails considerable uncertainty. Besides fuels, the
severity of the fire season depends on variables such as fire weather,
ignitions, and fire suppression resource availability that cannot be predicted
months in advance.

![Great Basin rangeland fire
area](/assets/images/great-basin-fire/area_2022_065.png)

Across the Great Basin, there has historically been a strong correlation between
the Palmer Drought Severity Index (PDSI) in June and the total area burned by
wildfires the following year. This relationship, which corroborates the
importance of the previous year's vegetation production in controlling fire in
the Great Basin, has been especially strong since about 2000. The PDSI from June
of last year is therefore an additional indicator of the likely severity of the
upcoming fire season.

![Great Basin rangeland fire
area](/assets/images/great-basin-fire/pdsi_2021.png)

<h3>What do past years look like?</h3>

The figure below shows the total area burned each year (large wildfires >1,000
acres) in the Great Basin. Bars are color-coded to display how much of that area
was in each probability category by March of that year. The overwhelming
majority of wildfire occurred in areas with probabilities >0.5 (warm colors).
Areas with lower probabilities (cold colors) burned much less.


![Great Basin rangeland fire
area-probability](/assets/images/great-basin-fire/burn_area_barplot.png)

Probabilities of past years and the fires that occurred (depicted by purple polygons) can be viewed in the video below.

{% include video id="V12XzlHU41g" provider="youtube" %}
