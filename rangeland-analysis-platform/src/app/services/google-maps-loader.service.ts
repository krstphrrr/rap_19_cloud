import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

const gapi = 'AIzaSyDllQcO2NYJk0KqA1NH80B_sINnAvUNGGA'

const googleMapsApiUrl =
    `https://maps.googleapis.com/maps/api/js?v=3&key=${gapi}&libraries=drawing,places`;

@Injectable()
export class GoogleMapsLoaderService {
    private loader: Loader;
    private loadPromise: Promise<typeof google>;

    constructor() {
        this.loader = new Loader({
            apiKey: gapi,
            version: '3',
            libraries: ['drawing', 'places']
        });
    }
    
    load(): Promise<typeof google> {
        if (!this.loadPromise) {
            this.loadPromise = this.loader.load()
                .then(() => {
                    console.log('Maps loaded');
                    return google;
                })
                .catch(err => {
                    console.error('Error loading Google Maps:', err);
                    throw err;
                });
        }
        return this.loadPromise;
    }
}
