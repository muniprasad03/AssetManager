import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-add-signal-maintanece',
  templateUrl: './add-signal-maintanece.component.html',
  styleUrls: ['./add-signal-maintanece.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSignalMaintaneceComponent implements OnInit {

  public addAssetMaintanenceForm: FormGroup;
  public scannedData: any;
  public assetDetails: any;
  public hasPermission: boolean;
  enableScanner = false;
  constructor(private SignalService: SignalService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.buildAddAssetForm();
  }

  buildAddAssetForm() {
    this.addAssetMaintanenceForm = this.formBuilder.group({
      station: new FormControl({ value: "TUNI", disabled: true }),
      zone: new FormControl({ value: "South Central Railway", disabled: true }),
      division: new FormControl({ value: "Vijayawada", disabled: true }),
      department: new FormControl({ value: "Signal", disabled: true }),
      signalType: new FormControl(null),
      subsidiaryType: new FormControl(null),
      typeOfUnit: new FormControl(null),
      signalName: new FormControl(null),
      serialNumber: new FormControl(null),
      milegeInKM: new FormControl(null),
      implantation: new FormControl(null),
      sacrificialMast: new FormControl(null),
      codalLife: new FormControl(null),
      remarks: new FormControl(null),
      dateOfManufacture: new FormControl(null),
      dateOfInstallation: new FormControl(null),
      make: new FormControl(null),
      model: new FormControl(null),
      signalBaseInstallation: new FormControl(null),
      signalPostInstallation: new FormControl(null),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
    });
  }         

  scanSuccessHandler(scannedData) {
    console.log('scanned data', scannedData);
    this.scannedData = scannedData;
    this.assetDetails = null;
    this.SignalService.getSignal(scannedData)
      .then(signal => {
        //window.location.href = '/#/signals';
        this.assetDetails = signal;
        this.scannedData = null;
        this.closeScanner();
        console.log(signal);
      });
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
