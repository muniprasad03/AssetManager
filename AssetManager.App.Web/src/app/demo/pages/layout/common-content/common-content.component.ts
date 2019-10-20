import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-common-content',
  templateUrl: './common-content.component.html',
  styleUrls: ['./common-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonContentComponent implements OnInit {
  public scannedData: any;
  public hasPermission: boolean;
  enableScanner = false;
  constructor() { }

  ngOnInit() {
  }

  scanSuccessHandler(scannedData) {
    console.log('scanned data', scannedData);
    this.scannedData = scannedData;
  }

  onHasPermission(permission: boolean) {
    this.hasPermission = permission;
    console.log(this.hasPermission, 'has permission');
    if (!this.hasPermission) {
      this.enableCamera();
    }
  }

  enableCamera() {
    navigator.mediaDevices.getUserMedia({ video: true });
  }
  openScanner() {
    this.enableScanner = true;
  }
  closeScanner() {
    this.enableScanner = false;
  }


  getLocation() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      if (position) {
        console.log('Latitude: ' + position.coords.latitude +
          'Longitude: ' + position.coords.longitude);
      }
    },
    (error: PositionError) => console.log(error));
  }
}
