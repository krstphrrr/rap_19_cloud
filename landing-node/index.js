/**
 * This file contains the routes of the Rangeland Analysis Platform website
 * @author Jeb Williamson, USDA-ARS Jornada Experimental Range
 */

const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use("/assets", express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/changelog', (req, res) => {
    res.render('changelog');
});

app.get('/great-basin-fire', (req, res) => {
    res.render('great-basin-fire');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/news/rap-support', (req, res) => {
    res.render('rap-support');
});

app.get('/news/timeline-for-2020', (req, res) => {
    res.render('timeline-for-2020');
});

app.get('/partner-tools', (req, res) => {
    res.render('partner-tools');
});

app.get('/products', (req, res) => {
    res.render('products');
});

app.get('/products/rapV3', (req, res) => {
    res.render('rapV3');
});

app.get('/rap', (req, res) => {
    res.render('rap');
});

app.get('/tos', (req, res) => {
    res.render('tos');
});

app.get('/support', (req, res) => {
    res.render('support');
});

app.get('/support/17-navigating-the-platform', (req, res) => {
    res.render('17-navigating-the-platform');
});

app.get('/support/18-shapefile-help', (req, res) => {
    res.render('18-shapefile-help');
});

app.get('/support/19-view-rap-data-in-your-gis', (req, res) => {
    res.render('19-view-rap-data-in-your-gis');
});

app.get('/support/22-guiding-principles', (req, res) => {
    res.render('22-guiding-principles');
});

app.get('/support/23-the-map-layers-panel', (req, res) => {
    res.render('23-the-map-layers-panel');
});

app.get('/support/24-analyzing-your-region-of-interest', (req, res) => {
    res.render('24-analyzing-your-region-of-interest');
});

app.get('/support/25-the-interactive-map', (req, res) => {
    res.render('25-the-interactive-map');
});

app.get('/support/26-the-analysis-panel', (req, res) => {
    res.render('26-the-analysis-panel');
});

app.get('/support/45-using-rap-landing', (req, res) => {
    res.render('45-using-rap-landing');
});

app.get('/support/46-new-to-rap-start-here-landing', (req, res) => {
    res.render('46-new-to-rap-start-here-landing');
});

app.get('/support/47-what-is-rap-landing', (req, res) => {
    res.render('47-what-is-rap-landing');
});

app.get('/support/48-vegetation-cover-dataset', (req, res) => {
    res.render('48-vegetation-cover-dataset');
});

app.get('/support/49-rangeland-production', (req, res) => {
    res.render('49-rangeland-production');
});

app.get('/support/52-troubleshooting-and-faqs-landing', (req, res) => {
    res.render('52-troubleshooting-and-faqs-landing');
});

app.get('/support/53-analyze-rap-data-in-excel', (req, res) => {
    res.render('53-analyze-rap-data-in-excel');
});

app.get('/support/54-using-rap-in-rangeland-decision-making', (req, res) => {
    res.render('54-using-rap-in-rangeland-decision-making');
});

app.get('/support/55-multi-scale-rangeland-monitoring', (req, res) => {
    res.render('55-multi-scale-rangeland-monitoring');
});

app.get('/support/56-known-data-issues', (req, res) => {
    res.render('56-known-data-issues');
});

app.get('/support/57-agency-points-of-contact', (req, res) => {
    res.render('57-agency-points-of-contact');
});

app.get('/support/58-publications-and-reports', (req, res) => {
    res.render('58-publications-and-reports');
});

app.get('/support/59-rap-metadata', (req, res) => {
    res.render('59-rap-metadata');
});

app.get('/support/60-faqs', (req, res) => {
    res.render('60-faqs');
});

app.get('/support/61-processing-rap-data-in-google-earth-engine', (req, res) => {
    res.render('61-processing-rap-data-in-google-earth-engine');
});

app.get('/support/62-export-vegetation-cover-rasters', (req, res) => {
    res.render('62-export-vegetation-cover-rasters');
});

app.get('/support/63-export-annual-biomass-rasters', (req, res) => {
    res.render('63-export-annual-biomass-rasters');
});

app.get('/support/64-batch-export-vegetation-cover-csvs', (req, res) => {
    res.render('64-batch-export-vegetation-cover-csvs');
});

app.get('/support/65-batch-export-herbaceous-biomass-csvs', (req, res) => {
    res.render('65-batch-export-herbaceous-biomass-csvs');
});

app.get('/support/70-production-explorer', (req, res) => {
    res.render('70-production-explorer');
});

app.listen(port, () => {});
