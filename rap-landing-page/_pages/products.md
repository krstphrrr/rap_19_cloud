---
title: "Products"
description: "Rangeland Analysis Platform geospatial products"
layout: single
classes: wide
author_profile: false
permalink: /products/
sidebar:
  nav: "products"
---

### Biomass

The Rangeland Analysis Platform's vegetation biomass product provides annual and
16-day aboveground biomass from 1986 to present of: annual forbs and grasses,
perennial forbs and grasses, and herbaceous (combination of annual and perennial
forbs and grasses). Estimates represent accumulated new biomass throughout the
year or 16-day period and do not include biomass accumulation in previous years.
Aboveground biomass was calculated by separating net primary production
(paritioned by functional group) to aboveground and converting carbon to biomass
(Jones et al. 2021, Robinson et al. 2019). Estimates are provided in United
States customary units (lbs/acre) to facilitate use. Although these data were
produced across a broad region, they are primarily intended for rangeland
ecosystems. Biomass estimates may not be suitable in other ecosystems, e.g.,
forests., and are not to be used in agricultural lands, i.e., croplands.

<span style="color:red">16-day biomass estimates for the current year are
provisional and will be recalculated at the end of the year. Significant land
cover changes (e.g., woodland to grassland, shrubland to grassland) during the
current year may or may not be reflected in the partitioning of biomass to
functional groups. We urge users to critically inspect current year 16-day
biomass estimates and interpret appropriately.</span>

Biomass estimates are calculated using a process-based model and therefore
traditional error metrics (e.g., MSE, RMSE) are not available. A comparison of
biomass estimates to gSSURGO, the [Rangeland Production Monitoring
Service](https://www.fuelcast.net/), and 16,591 USDA NRCS NRI on-the-ground
estimates is reported in [Jones et al.
(2021)](https://doi.org/10.1016/j.rama.2021.04.003).

![RAP NRI biomass](/assets/images/rapBiomassNRI.jpg)  
Density scatterplot of RAP herbaceous aboveground biomass (HAGB) and 16,591 USDA
NRCS NRI plot-level biomass estimates, 1:1 line (black), and Pearson correlation
coefficient (r=0.63). Figure from [Jones et al.
(2021)](https://doi.org/10.1016/j.rama.2021.04.003).

![RAP biomass comparison](/assets/images/rapBiomassComparison.jpg)  
Differences (a-c) between three gridded rangeland production datasets across
western U.S. rangelands using the 50th percentile of annual values (2000-2018)
from RAP and RPMS data, and 'normal' values from gSSURGO. Scatterplots and
Pearson correlation coefficients (d-f) of production values sampled from each
data set for 5000 randomly selected rangeland locations. Figure from [Jones et
al. (2021)](https://doi.org/10.1016/j.rama.2021.04.003).

The vegetation biomass data and maps are intended to be used alongside local
knowledge and on-the-ground data to inform management actions that improve
rangelands and wildlife habitat. They should not be used in isolation to
quantify rangeland resources, determine or define thresholds, or evaluate the
efficacy of management practices or treatments. Data can be used to evaluate
resources in concert with site-specific information about the area under
investigation, such as past land management practices, vegetation treatments,
conservation efforts, or natural disturbances.

Jones, M.O., N.P. Robinson, D.E. Naugle, J.D. Maestas, M.C. Reeves, R.W.
Lankston, and B.W. Allred. 2021. Annual and 16-day rangeland production
estimates for the western United States. Rangeland Ecology & Management
77:112–117. <http://dx.doi.org/10.1016/j.rama.2021.04.003>

Robinson, N.P., M.O. Jones, A. Moreno, T.A. Erickson, D.E. Naugle, and B.W.
Allred. 2019. Rangeland productivity partitioned to sub-pixel plant functional
types. Remote Sensing 11:1427. <https://dx.doi.org/10.3390/rs11121427>

### Cover

The Rangeland Analysis Platform's vegetation cover product provides annual
percent cover estimates from 1986 to present of: annual forbs and grasses,
perennial forbs and grasses, shrubs, trees, and bare ground. The estimates were
produced by combining 75,000 field plots collected by BLM, NPS, and NRCS with
the historical Landsat satellite record. Utilizing the power of cloud computing,
cover estimates are predicted across the United States at 30m resolution, an
area slightly larger than a baseball diamond.

Vegetation cover estimates are model predictions. When interpreting cover, it is
important to consider the model error specific to each functional group. Error
metrics measure the average difference between predicted model output and
separate on-the-ground measurements. For vegetation cover, 10% (approximately
7,500 plots) of the field plot data were withheld from model training and used
for evaluation. The error metrics in the table below represent the average
accuracy of the model for each functional group:


Vegetation cover | Annual forbs and grasses |	Perennial forbs and grasses | Shrubs | Trees | Bare ground
:--------------: | :----------------------: | :-------------------------: | :----: | :---: | :---------:
Mean absolute error (%)	| 7.0 |	10.2 | 6.2 | 2.6 | 6.5
Root mean square error (%) | 11.0 | 14.0 | 8.8	| 6.7	| 9.6

These errors provide a general accuracy assessment. For example, across 7,500
field plots, the average RAP prediction for annual forb and grass pixel was +/-
7.0% (mean absolute error) relative to field plot measurements. 

The vegetation cover data and maps are intended to be used alongside local
knowledge and on-the-ground data to inform management actions. They should not
be used in isolation to quantify rangeland resources, determine or define cover
thresholds, or evaluate the efficacy of management practices or treatments. Data
can be used to evaluate resources in concert with site-specific information
about the area under investigation, such as past land management practices,
vegetation treatments, conservation efforts, or natural disturbances.

Allred, B.W., B.T. Bestelmeyer, C.S. Boyd, C. Brown, K.W. Davies, M.C. Duniway,
L.M. Ellsworth, T.A. Erickson, S.D. Fuhlendorf, T.V. Griffiths, V. Jansen, M.O.
Jones, J. Karl, A. Knight, J.D. Maestas, J.J. Maynard, S.E. McCord, D.E. Naugle,
H.D. Starns, D. Twidwell, and D.R. Uden. 2021. Improving Landsat predictions of
rangeland fractional cover with multitask learning and uncertainty. Methods in
Ecology and Evolution. <http://dx.doi.org/10.1111/2041-210x.13564>

### Data download

Annual biomass data are available in Google Earth Engine ([example
script](https://code.earthengine.google.com/e48f56f7d2c16d53e09c4b8246104465))
and as GeoTIFFs from
<http://rangeland.ntsg.umt.edu/data/rap/rap-vegetation-biomass/>.

Cover data are available in Google Earth Engine (ImageCollection
'projects/rangeland-analysis-platform/vegetation-cover-v3') and as GeoTIFFs from
<http://rangeland.ntsg.umt.edu/data/rap/rap-vegetation-cover/>.

<br>
## Carbon

### Partitioned NPP

The Rangeland Analysis Platform provides net primary productivity (NPP)
estimates from 1986 to present. Estimates are partitioned into the following
functional groups: annual forb and grass, perennial forb and grass, shrub, and
tree. NPP is the net increase (i.e., photosynthesis minus respiration) in total
plant carbon, including above and below ground.

Partitioned NPP cannot be viewed or analyzed in the RAP web application.

Robinson, N.P., M.O. Jones, A. Moreno, T.A. Erickson, D.E. Naugle, and B.W.
Allred. 2019. Rangeland productivity partitioned to sub-pixel plant functional
types. Remote Sensing 11:1427. <https://dx.doi.org/10.3390/rs11121427>

### NPP data download

Partitioned NPP is available as GeoTIFFs from
<http://rangeland.ntsg.umt.edu/data/rap/rap-vegetation-npp/> and in Google Earth
Engine (ImageCollection
'projects/rangeland-analysis-platform/npp-partitioned-v3').

<br>
## Great Plains conservation

### Categorical tree cover

Annual categorical tree cover across the Great Plains biome. Class
categorization was performed with the rangeland cover product at 480m
resolution. Agriculture, development, and water were masked out according to the
NLCD 2016 Land Cover product. Data represents tree canopy cover in the following
classes: 0-4% and >=5%.

### Cultivation risk

Probabilistic ecoregion-wide model that used soil, topographic, and climatic
variables to simulate future conversion. This data can be used to direct
grassland conservation efforts and as a metric to assess suitability of future
crop expansion. Additionally, when applied to previous conversion (see
<https://www.worldwildlife.org/pages/plowprint-report-map>), the data can be
used to evaluate the suitability of those areas to perpetual row crop
agriculture.

Olimb, S.K. and B. Robinson. 2019. Grass to grain: Probabilistic modeling of
agricultural conversion in the North American Great Plains. Ecological
Indicators 102:237-245. <http://dx.doi.org/10.1016/j.ecolind.2019.02.042>

### Woody transitions

This product provides a rapid screening tool for identifying the leading edge of
vegetation transitions in Great Plains rangelands and serves as an early warning
for the loss of intact rangelands to woody expansion. Alternative ecological
states are incapable of coexisting in the same space at a given point in time
(Uden et al. 2019). For example, a savanna represents co-dominance of grasses
and trees, meaning that grass-tree functional groups relatively coexist in the
same space over time. In contrast, grass-tree functional groups fail to coexist
in many regions of the world and represent fundamental alternative states in
those instances. Transitions from one state to another are known to exhibit
strong spatial order (Allen et al. 2016, Roberts et al. 2019); therefore,
functional groups that do not coexist should covary negatively in space. This
data product maps the geographic boundaries between grassy and woody states at
two scales. When the geographic location of these boundaries change over time,
rangeland resilience is being eroded (Uden et al. 2019) and the system is
increasingly vulnerable to being lost to woody expansion. This is represented in
the data product when a signal is present in a given year, persistent over
multiple years, and non-stationarity in its geographic location over time.

For planning purposes, two scales were pulled from a multitude of scales in a
multi-scale analysis (following Uden et al. 2019) and provided as woody
transitions layers. The broad-scale layer is computed and visualized to
represent the boundary of the Great Plains grasslands biome, with scale being a
product of both moving window (i.e., kernel) dimension and pixel resolution
(i.e., grain). The broad-scale layer was computed with a 139 x 139-pixel moving
window algorithm at 240-meter resolution. A second, moderate-scale was computed
and visualized for regional-scale planning and represents the general spatial
boundaries between alternative grassy and woody ecological states at a finer
scale. The moderate-scale layer was computed with an 81 x 81-pixel moving window
algorithm at 30-meter resolution. Increasingly negative spatial covariance
values between grass and tree functional groups represent increasingly severe
segregation of grass/tree functional groups in space. Fill value = NA/NoData;
corresponds to developed areas, croplands, or water, as classified in the 2011
National Land Cover Database (Homer et al. 2015), or wetlands and their 60-m
buffers, as delineated in the National Wetlands Inventory (U.S. Fish and
Wildlife Service 2019).

Input data: Perennial forbs/grasses vs. trees percent cover data. Sourced from
Rangeland Analysis Platform (RAP) cover v2.0, <https://rangelands.app>

Data use and interpretation must follow guidelines set forth at
<https://rangelands.app/products/>, Uden et al. (2019), and Allred et al.
(2021).

**Reminders and limitations**

Transition data are meant to be combined with RAP cover data and local expert
knowledge to understand vegetation change and is not meant to replace those
products.

When mapping spatial covariance data, upper and lower values over which the
color ramp is stretched influence the sensitivity of the early warning signal of
vegetation change and the display of transition severity. Such optimization of
images may be useful for mapping variability over different ranges of transition
severity in different locations; however, users should be advised that these
adjustments also affect the potential for false positives/negatives in spatial
transition detection.

Transition signals were computed for conservation planning at two scales and
represent a subset of a more robust multi-scale analysis. Cross-scale
considerations of transitions will elucidate patches of intact rangeland
vegetation nested within broader regional patterns shown here. Product testing
is underway on cross-scale products and outputs.

Only one functional group combination from RAP data is present in this data.
Alternative functional group combinations may provide additional insights into
vegetation transitions at various scales.

Allen, C.R., D.G. Angeler, G.S. Cumming, C. Folke, D. Twidwell, and D.R. Uden. 2016. Quantifying spatial resilience. Journal of Applied Ecology 53:625–635.
<https://dx.doi.org/10.1111/1365-2664.12634>

Allred, B.W., B.T. Bestelmeyer, C.S. Boyd, C. Brown, K.W. Davies, M.C. Duniway,
L.M. Ellsworth, T.A. Erickson, S.D. Fuhlendorf, T.V. Griffiths, V. Jansen, M.O.
Jones, J. Karl, A. Knight, J.D. Maestas, J.J. Maynard, S.E. McCord, D.E. Naugle,
H.D. Starns, D. Twidwell, and D.R. Uden. 2021. Improving Landsat predictions of
rangeland fractional cover with multitask learning and uncertainty. Methods in
Ecology and Evolution. <http://dx.doi.org/10.1111/2041-210x.13564>

Homer, C., J. Dewitz, L. Yang, S. Jin, P. Danielson, G. Xian, J. Coulston, N.
Herold, J. Wickham, and K. Megown. 2015. Completion of the 2011 National Land
Cover Database for the conterminous United States–representing a decade of land
cover change information. Photogrammetric Engineering & Remote Sensing
81:345–354.

Roberts, C.P., C.R. Allen, D.G. Angeler, and D. Twidwell. 2019. Shifting avian
spatial regimes in a changing climate. Nature Climate Change 9:562–568.
<https://dx.doi.org/10.1038/s41558-019-0517-6>

U.S. Fish and Wildlife Service. 2019. National Wetlands Inventory website. U.S.
Department of the Interior, Fish and Wildlife Service, Washington, D.C., U.S.A.
Available online at: <https://www.fws.gov/wetlands/>

Uden, D. R., D. Twidwell, C. R. Allen, M. O. Jones, D. E. Naugle, J. D. Maestas,
and B. W. Allred. 2019. Spatial Imaging and Screening for Regime Shifts.
Frontiers in Ecology and Evolution 7:407.
<https://dx.doi.org/10.3389/fevo.2019.00407>

### Great Plains data download

Great Plains data are available as GeoTIFFs from
<http://rangeland.ntsg.umt.edu/data/rap/rap-derivatives/great-plains/>.

<br>
## Sagebrush conservation

### Annual herbaceous cover

Estimated percent cover of herbaceous annuals at 30m resolution on rangelands
across the sagebrush biome. Non-rangeland areas, such as forests, water, crops,
and development are excluded. These data are a weighted average of three
large-scale datasets, providing land managers with estimates of recent
(2016-2018) annuals cover across western rangelands. This data layer was
developed by a cheatgrass committee convened by the Western Governors
Association-appointed Western Invasive Species Council as part of a new toolkit
for invasive annual grass management across the western U.S. Detailed methods
are [available](/products/annualHerbaceousCoverMethods.pdf).

Maestas, J., Jones, M., Pastick, N.J., Rigge, M.B., Wylie, B.K., Garner, L.,
Crist, M., Homer, C., Boyte, S., and Witacre, B., 2020, Annual Herbaceous Cover
across Rangelands of the Sagebrush Biome: U.S. Geological Survey data release,
<https://doi.org/10.5066/P9VL3LD5>

<h3 id='sagebrush-categorical-tree-cover'>Categorical tree cover</h3>

Annual categorical tree cover across the Sagebrush biome. Class categorization
was performed with the rangeland cover product at 30m resolution. Agriculture,
development, and water were masked out according to the NLCD 2016 Land Cover
product. Data represents tree canopy cover in the following classes: 0-1%,
2-10%, 11-20%, and >=21%.

### Ecosystem resilience and resistance

This data provides a tool for rapid risk assessment across the range of
sage-grouse using an index of sagebrush ecosystem resilience to disturbance and
resistance to cheatgrass ("R&R"). Potential ecosystem R&R depends in part on the
biophysical conditions an area is capable of supporting and soil temperature and
moisture regimes can be used to depict this gradient (Chambers et al. 2014,
2016, 2017; Maestas et al. 2016). Soils data were derived from two primary
sources: 1) completed and interim soil surveys available through the Soil Survey
Geographic Database (SSURGO), and 2) the State Soils Geographic Database
(STATSGO2) to fill gaps where SSURGO data were not available (Fig. 1). Using
best available information and expert input, each soil temperature and moisture
regime/moisture subclass was placed into one of three categories of relative
R&R: high, moderate, and low (see: Chambers et al. 2014, 2016; Maestas et al.
2016). Soils with high water tables, wetlands, or frequent ponding that would
not typically support sagebrush were not rated.

Chambers et al. 2014. Using resistance and resilience concepts to reduce impacts
of annual grasses and altered fire regimes on the sagebrush ecosystem and
sage-grouse– A strategic multi-scale approach. Fort Collins, CO, USA: U.S.
Department of Agriculture, Forest Service, RMRS-GTR-326.
<https://www.fs.fed.us/rm/pubs/rmrs_gtr326.pdf>

Chambers et al. 2016. Using resilience and resistance concepts to manage threats
to sagebrush ecosystems, Gunnison sage-grouse, and greater sage-grouse in their
eastern range: a strategic multi-scale approach. Gen. Tech. Rep. RMRS-GTR-356.
Fort Collins, CO: U.S. Department of Agriculture, Forest Service, Rocky Mountain
Research Station. <https://www.fs.fed.us/rm/pubs/rmrs_gtr356.pdf>

Chambers et al. 2017. Using Resilience and Resistance Concepts to Manage
Persistent Threats to Sagebrush Ecosystems and Greater Sage-grouse. Rangeland
Ecology and Management. 70:149-164.
<https://www.treesearch.fs.fed.us/pubs/53742>

Maestas, J. D., and S. B. Campbell. 2014. Mapping Potential Ecosystem Resilience
and Resistance across Sage-Grouse Range using Soil Temperature and Moisture
Regimes. Fact Sheet. Sage Grouse Initiative.
<http://www.sagegrouseinitiative.com/wp-content/uploads/2013/07/Soil-Temp-Moist-Data-Fact-Sheet-HIGH-RES-012215.pdf>

Maestas et al. 2016. Tapping Soil Survey Information for Rapid Assessment of
Sagebrush Ecosystem Resilience and Resistance. Rangelands 38:120-128.
<https://dx.doi.org/10.1016/j.rala.2016.02.002>

### Sagebrush data download

Sagebrush data are available as GeoTIFFs from
<http://rangeland.ntsg.umt.edu/data/rap/rap-derivatives/sagebrush/>.
