---
title: "Cover 2.0"
layout: single
classes: wide2
author_profile: false
permalink: /products/coverV2/
---
On July 6, 2020, the Rangeland Analysis Platform switched to cover 2.0 as the
default product for rangeland cover. Cover 1.0 was removed July 19, 2021.


**Why a new version?**  
Cover 1.0 was released in summer 2018. Since then there have been advances in
data handling and modeling, creating new opportunities for an improved product.
More on-the-ground data have also been collected and released by the federal
monitoring programs. Cover 2.0 was developed with the intent to create a new
product that uses the best available data, modeling, and resources.


**What is new in version 2.0?**  
The primary change is the use of a neural network to predict rangeland cover.
This approach better handles the continuous time series measurements from
Landsat satellites and also produces a multivariate response of cover. That is,
the interactions among functional groups are learned and predicted together,
resulting in an improved model that reflects real world interactions among
functional groups, e.g., an increase in tree cover results in a decrease in
grass and forb cover. These interactions are defined by the data, eliminating
the need for predetermined conditions or rules.

Other changes include increased on-the-ground plot data and Landsat
measurements, the removal of non Landsat predictors (e.g., weather), and the
production of spatially explicit, pixel-level estimates of model uncertainty.
The table below summarizes the major changes in cover 2.0.

|        | Cover 1.0 |	Cover 2.0
:------: | :-------: | :-------:
Model |	Random Forest	| Convolutional Neural Network
Data|	31,300 plots|	57,792 plots
Landsat measurements|	3; seasonal averages|	12; 64 day averages
Predictors|	40; variable per group|	10; Landsat based
Uncertainty|	-|	pixel-level
Prediction pipeline|	Google Earth Engine|	Google Earth Engine & Google AI Platform

<br>
**Error metrics**  
Cover 2.0 error metrics decreased, indicating greater predictive accuracy.
Further discussion of error metrics can be found in the
[preprint](https://doi.org/10.1101/2020.06.10.142489).


| Vegetation cover |	Annual forbs and grasses|	Perennial forbs and grasses|	Shrubs|	Trees|	Bare ground
:----------------: | :---: | :---: | :---: | :---: | :---:
**Mean absolute error (%) cover 2.0** |	7.0|	10.3|	5.8|	2.8|	6.7
**Root mean square error (%) cover 2.0** |	11.0|	14.0|	8.3|	6.8|	9.8
Mean absolute error (%) cover 1.0|	7.8|	11.1|	6.9|	4.7|	7.3
Root mean square error (%) cover 1.0|	11.8|	14.9|	9.9|	8.5|	10.6  

<br>
**Where can I learn more about cover 2.0?**  
A [manuscript](https://doi.org/10.1111/2041-210X.13564) describing the methods
and evaluation of cover 2.0 has been published in Methods in Ecology and
Evolution..

**What will happen with cover 1.0?**  
Cover 1.0 was removed July 19, 2021. Cover 1.0 data are archived at
[Zenodo](https://zenodo.org/communities/rangeland-analysis-platform/).

**How often will the cover product be updated?**  
Major version updates (e.g., 1.0 to 2.0) will be assessed on a two year cycle,
and will occur only if there are significant changes, i.e., model changes,
additional features, etc. The entire time period will be produced to ensure
consistency. Previous major versions (e.g., 1.0) will be produced and maintained
for a period of at least two years after updating. A major update will supersede
a minor update.

Minor version updates (e.g., 2.1) will be carried out on a two year cycle, and
will primarily include training data updates or additions, new Landsat sensors,
etc. The entire time period will be produced to ensure consistency. One year
cycles may be considered if determined valuable. Previous minor versions will be
produced and maintained for a period of at least two years after updating.
