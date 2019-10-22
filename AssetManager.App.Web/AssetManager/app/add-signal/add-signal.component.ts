import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-add-signal',
  templateUrl: './add-signal.component.html',
  styleUrls: ['./add-signal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSignalComponent implements OnInit {
  public addAssetForm: FormGroup;
  public scannedData: any;
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
    this.addAssetForm = this.formBuilder.group({
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

  saveAsset(): void {
    const modelCopy = this.addAssetForm.value;
    const metadata = {
      signalType: this.addAssetForm.value["signalType"],
      subsidiaryType: this.addAssetForm.value["subsidiaryType"],
      typeOfUnit: this.addAssetForm.value["typeOfUnit"],
      signalName: this.addAssetForm.value["signalName"],
      serialNumber: this.addAssetForm.value["serialNumber"],
      milegeInKM: this.addAssetForm.value["milegeInKM"],
      implantation: this.addAssetForm.value["implantation"],
      sacrificialMast: this.addAssetForm.value["sacrificialMast"],
      codalLife: this.addAssetForm.value["codalLife"],
      remarks: this.addAssetForm.value["remarks"]
    };

    modelCopy["metaData"] = metadata;
    this.SignalService
      .addSignal(modelCopy)
      .then(signals => {
        window.location.href = '/#/signals';
        console.log(signals);
      });
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
        this.addAssetForm.controls["latitude"].setValue(position.coords.latitude);
        this.addAssetForm.controls["longitude"].setValue(position.coords.longitude);
        console.log('Latitude: ' + position.coords.latitude +
          'Longitude: ' + position.coords.longitude);
      }
    },
      (error: PositionError) => console.log(error));
  }

}
