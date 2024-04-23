import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapStateService } from 'app/services/map-state.service';
import {AnalysisService } from 'app/services/analysis.service';
import { RoutingService } from 'app/services/routing.service';
import { LandcoverReferenceComponent } from 'app/components/landcover-reference/landcover-reference.component';
import { LayoutComponent } from 'app/components/layout/layout.component';

const appRoutes: Routes = [
  {path: '', component: LayoutComponent},
  {path: 'info', component: LandcoverReferenceComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MapStateService,
    AnalysisService,
    RoutingService
  ]
})
export class RoutingModule {}
