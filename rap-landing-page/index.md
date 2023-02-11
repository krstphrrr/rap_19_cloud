---
layout: splash
author_profile: false
header:
  overlay_image: /assets/images/tallgrass.jpg
  show_overlay_excerpt: false
  actions:
  - label: "Launch RAP"
    url: /rap/

feature_row1:
  - image_path: /assets/images/rapSatellite.png
    alt: "Rangeland Analysis Platform"
    title: "Data at your fingertips"
    excerpt: 'Fast, powerful, and free, the Rangeland Analysis Platform is an innovative online tool that quickly visualizes and analyzes vegetation data for the United States. [Launch the app](/rap/) to examine trends at pasture, ranch, watershed, or broader scales. Datasets include:<br>  

    * [Continuous vegetation cover](/products/#cover): see abundance and distribution of perennial or annual herbaceous, shrubs, trees, and bare ground<br>

    * [Annual aboveground biomass](/products/#biomass): see how much and where production has changed over the years<br>

    * [16-day aboveground biomass](/products/#biomass) (including current year): see how production has changed within the growing season'

feature_row2:
  - image_path: /assets/images/fire.jpg
    alt: "Fire in tallgrass prairie"
    title: "Monitor vegetation to improve rangelands"
    excerpt: 'The Rangeland Analysis Platform provides powerful perspective and context for rangeland monitoring. Use it to develop new management strategies and to evaluate current or past management practices.'
    url: "https://youtu.be/lY2-ApD2sec"
    btn_label: "Intro video"
    btn_class: "btn--primary"

feature_row3:
  - image_path: /assets/images/ranchers.jpg
    alt: "Ranchers"
    title: "Big landscapes and big data"
    excerpt: 'The Rangeland Analysis Platform combines satellite imagery with thousands of on-the-ground vegetation measurements collected by BLM, NPS, and NRCS. The power of cloud computing and machine learning technology allows the RAP to easily map vegetation across the United States.'
    url: "https://support.rangelands.app"
    btn_label: "Support site"
    btn_class: "btn--primary"

feature_row4:
  - image_path: /assets/images/appMonitoringSmall.jpg
    title: Rangeland Analysis Platform
    url: "/rap/"
    btn_label: "Launch app"
    btn_class: "btn--primary btn--large"

app_gallery1:
  - image_path: /assets/images/rapSatellite.png
    title: "RAP"
    #excerpt: "Rap main app"
    url: "/rap/"
    btn_label: "Launch RAP"
    btn_class: "btn--primary"
  - image_path: /assets/images/productionExplorer.png
    title: "Production Explorer"
    #excerpt: "Production Explorer"
    url: "/production-explorer/"
    btn_label: "Launch Production Explorer"
    btn_class: "btn--primary"
  - image_path: /assets/images/cheatgrass.png
    title: "Cheatgrass"
    #excerpt: "Cheatgrass"
    url: "/cheatgrass/"
    btn_label: "Launch Cheatgrass app"
    btn_class: "btn--primary"
  - image_path: /assets/images/greatBasinFire.png
    title: "Great Basin fire"
    #excerpt: "Cheatgrass"
    url: "/great-basin-fire/"
    btn_label: "Visit page"
    btn_class: "btn--primary"
  - image_path: /assets/images/historicalImagery.png
    title: "Historical imagery"
    #excerpt: "Cheatgrass"
    url: "/historical-imagery/"
    btn_label: "Visit page"
    btn_class: "btn--primary"


---

<h1>Monitor rangelands across the USA</h1>
{: .text-center}

{% for post in site.posts limit: 1 %}
  {% if post.link %}
  <a href="{{ post.link }}">{{ post.title }}</a>
  {: .text-center}
  {% else %}
  <a href="{{ post.url }}">{{ post.title }}</a>
  {: .text-center}
  {% endif %}
{% endfor %}

<h1> Apps and Tools </h1>{: .text-center}
{% include feature_row id="app_gallery1" %}{: .text-center}

{% include feature_row id="feature_row1" type="left" %}

{% include feature_row id="feature_row3" type="right" %}

{% include feature_row id="feature_row2" type="left" %}
