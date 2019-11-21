import { Component, OnInit } from '@angular/core';
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

  constructor(private SignalService: SignalService) { }

  ngOnInit() {
  }


  scanSuccessHandler(scannedData) {
    console.log('scanned data', scannedData);
    this.scannedData = scannedData;
    this.assetDetails = null;
    if (!this.formSubmitted) {
      this.formSubmitted = true;
      this.SignalService.getSignalByQr(scannedData)
        .then(signal => {
          if (signal && signal.id > 0) {
            this.assetDetails = signal;
            this.scannedData = null;
            this.closeScanner();
            let url = "";
            switch (signal.assetType) {
              case 1:
                url = "#/signalmaintanence/" + signal.id;
                break;
              case 2:
                url = "#/pointmaintanece/" + signal.id;
                break;
              case 3:
                url = "#/trackcircuitmaintanece/" + signal.id;
                break;
              case 4:
                url = "#/axelmaintanence/" + signal.id;
                break;
              case 5:
                url = "#/blockmaintanece/" + signal.id;
                break;
            }
            console.log(signal);
            window.location.href = url;
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

}
