---
title: "RAP 3.0"
layout: single
classes: wide2
author_profile: false
permalink: /products/rapV3/
sitemap: true
published: true
---

On January 01, 2022 the Rangeland Analysis Platform updated cover and biomass
datasets to version 3.0.

**Why a new version?**  
RAP updates occur every two years. The 2022 update was moved up due to the
deprecation of Landsat Collection 1, which occurred December 31, 2021.

**What is new in version 3.0?**  
Primary changes include:
* Use of Landsat Collection 2
* Addition of the National Park Service Northern Colorado Plateau Network (NCPN) monitoring data for cover training
* Identify agriculture, development, and water
* Addition of the eastern states

*Cover versions*

|        | Cover 1.0 |	Cover 2.0 | Cover 3.0
:------: | :-------: | :-------: | :-------:
Model |	Random Forest	| Convolutional Neural Network | Convolutional Neural Network
Data|	31,300 plots|	57,792 plots | 74,966 plots
Landsat measurements|	3; seasonal averages|	12; 64 day averages |	12; 64 day averages
Predictors|	40; variable per group|	10; Landsat based |	10; Landsat based
Uncertainty|	-|	pixel-level | -
Prediction pipeline|	Google Earth Engine|	Google Earth Engine & AI Platform |	Google Earth Engine & AI Platform

<br>
*Cover error metrics*

| Vegetation cover |	Annual forb and grass|	Perennial forb and grass|	Shrub|	Tree | Litter |	Bare ground
:----------------: | :---: | :---: | :---: | :---: | :---: | :---:
**Mean absolute error (%) cover 3.0** |	7.0|	10.2|	6.2|	2.6|	5.7 | 6.5
**Root mean square error (%) cover 3.0** |	11.0|	14.0|	8.8|	6.7|	7.8 | 9.6
Mean absolute error (%) cover 2.0 |	7.0|	10.3|	5.8|	2.8|	5.7 | 6.7
Root mean square error (%) cover 2.0 |	11.0|	14.0|	8.3|	6.8|	7.9| 9.8
Mean absolute error (%) cover 1.0|	7.8|	11.1|	6.9|	4.7|	- | 7.3
Root mean square error (%) cover 1.0|	11.8|	14.9|	9.9|	8.5|	- | 10.6  

<br>
*Biomass*  
Biomass 3.0 uses cover 3.0 for functional group partitioning. Minor alterations
were made to improve biomass partitioning and estimates.

<br>
**What will happen with cover and biomass 2.0?**  
Cover and biomass 2.0 data can be downloaded at
<http://rangeland.ntsg.umt.edu/data/rap/> and are also archived at
[Zenodo](https://zenodo.org/communities/rangeland-analysis-platform/).

**How often will RAP be updated?**  
Major version updates (e.g., 2.0 to 3.0) will be assessed on a two year cycle,
and will occur if there are significant changes, i.e., model changes, additional
features, etc. The entire time period will be produced to ensure consistency.
Previous major versions will be produced and maintained for one year after
updating.
