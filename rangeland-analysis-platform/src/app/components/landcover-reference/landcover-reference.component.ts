import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInOut } from 'app/constants/animations';

@Component({
  selector: 'app-landcover-reference',
  templateUrl: './landcover-reference.component.html',
  styleUrls: ['../dialog/dialog.component.css', './landcover-reference.component.css'],
  animations: [ fadeInOut ]

})
export class LandcoverReferenceComponent extends DialogComponent {

  constructor(router: Router, route: ActivatedRoute)  { super(router, route); }
}
