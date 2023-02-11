import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleStyleConverterService {

  constructor() { }

  public get_static_style(styles) {
    const result = [];
    styles.forEach(function (v, i, a) {

      let style = '';
      if (v.stylers) { // only if there is a styler object
        if (v.stylers.length > 0) { // Needs to have a style rule to be valid.
          style += (v.hasOwnProperty('featureType') ? 'feature:' + v.featureType : 'feature:all') + '|';
          style += (v.hasOwnProperty('elementType') ? 'element:' + v.elementType : 'element:all') + '|';
          v.stylers.forEach((val) => {
            const propertyname = Object.keys(val)[0],
              propertyval = val[propertyname].toString().replace('#', '0x');
            style += propertyname + ':' + propertyval + '|';
          });
        }
      }
      result.push('style=' + encodeURIComponent(style));
    });
    return result.join('&');
  }
}
