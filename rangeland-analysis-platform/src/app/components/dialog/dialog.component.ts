import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInOut } from 'app/constants/animations'

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    animations: [fadeInOut],
    standalone: false
})
export class DialogComponent {
  router: Router;
  route: ActivatedRoute;
  @HostBinding('@fadeInOut') fadeInOut = 'in';
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.router.navigate(['../'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
  }
  constructor(router: Router, route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

}
