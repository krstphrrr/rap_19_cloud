import { Component, Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-splash-dialog',
  templateUrl: './splash-dialog.component.html',
  styleUrls: ['./splash-dialog.component.css']
})
export class SplashDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SplashDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {startTour: boolean, dontShow: boolean}) {
      this.data = {
        startTour: true,
        dontShow: localStorage.getItem('showSplash') !== 'false'};
  }

  onNoShowClick() {
    localStorage.setItem('showSplash', this.data.dontShow ? 'false' : 'true')
  }

  onTourClick(): void {
    this.dialogRef.close(this.data);
  }
  onAppClick(): void {
    this.data.startTour = false;
    this.dialogRef.close(this.data);
  }

}

