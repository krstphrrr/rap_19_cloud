import { Component, OnInit} from '@angular/core';
import { TourService } from 'ngx-ui-tour-md-menu';
import { RoutingService } from '../../services/routing.service';
import { TourConfig } from 'app/config';
// import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {MatDialog} from '@angular/material/dialog';

import { SplashDialogComponent } from '../splash-dialog/splash-dialog.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
 /*
  * Container for the app, holds root router-outlet
  */
  constructor(
    private routing: RoutingService,
    private tourService: TourService,
    private splash: MatDialog
   ) {
   }


   openSplash(): void {
    const dialogRef = this.splash.open(
      SplashDialogComponent,
      {width: '500px', height: '250px'}
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result.startTour) {
        this.tourService.initialize(TourConfig);
        this.tourService.start();
      }
      this.routing.updateUrlParams({tour: null});

    });
  }


   ngOnInit() {

    const routing = this.routing;

    setTimeout(() => {
      const params = routing.getParams();
      console.log(params);
      if (params.tour || localStorage.getItem('showSplash') !== 'true') {
        // this.openSplash()
      }
    }, 500);
  }
}
