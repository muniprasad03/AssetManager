import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SignalService } from '../../signal-service/signal-service';

@Component({
  selector: 'app-maintanence',
  templateUrl: './maintanence.component.html',
  styleUrls: ['./maintanence.component.css']
})
export class MaintanenceComponent implements OnInit {
  public scannedData: any;
  public hasPermission: boolean;
  public assetDetails: any;
  existingName: string;
  enableScanner = false;
  formSubmitted: boolean;

  constructor(private SignalService: SignalService, private location: Location) { }

  ngOnInit() {
  }


  scanSuccessHandler(scannedData) {
    console.log('scanned data', scannedData);
    this.scannedData = scannedData;
    this.assetDetails = null;
    if (!this.formSubmitted) {
      this.formSubmitted = true;
      this.SignalService.getSignalByQr(scannedData)
        .then(signals => {
          if (signals && signals.length > 0) {
            this.assetDetails = signals;
            this.scannedData = null;
            this.closeScanner();
            this.assetDetails.forEach(signal => {
              let url = "";
              switch (signal.assetType) {
                case 1:
                  signal.url = "#/signalmaintanence/" + signal.id;
                  signal.typeName = "Signal";
                  break;
                case 2:
                  signal.url = "#/pointmaintanece/" + signal.id;
                  signal.typeName = "Point";
                  break;
                case 3:
                  signal.url = "#/trackcircuitmaintanece/" + signal.id;
                  signal.typeName = "Track";
                  break;
                case 4:
                  signal.url = "#/axelmaintanence/" + signal.id;
                  signal.typeName = "Axel";
                  break;
                case 5:
                  signal.url = "#/blockmaintanece/" + signal.id;
                  signal.typeName = "Block";
                  break;
              }
            });
          }
            this.formSubmitted = false;
        });
    }
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

  back() {
    this.location.back();
  }

}
