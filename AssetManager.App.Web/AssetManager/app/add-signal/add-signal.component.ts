import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BsModalRef } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-signal',
  templateUrl: './add-signal.component.html',
  styleUrls: ['./add-signal.component.css'],
})
export class AddSignalComponent implements OnInit {
  public addAssetForm: FormGroup;
  public scannedData: any;
  public hasPermission: boolean;
  public signalId: number;
  public signal: Signal = new Signal({});

  enableScanner = false;
  constructor(private SignalService: SignalService,
        private route: ActivatedRoute,
    private router: Router,
        private formBuilder: FormBuilder
  ) {
    this.buildAddAssetForm();
    this.route.params.subscribe(params => {
      this.signalId = +params['id'];
    });
  }

  ngOnInit() {
    if (this.signalId > 0) {
      this.SignalService.getSignal(this.signalId).then(sig => {
        this.signal = new Signal(sig);
        this.buildAddAssetForm();
      });
    }
  }


  buildAddAssetForm() {
    this.addAssetForm = this.formBuilder.group({
      id: new FormControl(this.signal.id),
      station: new FormControl({ value: "TUNI", disabled: true }),
      zone: new FormControl({ value: "South Central Railway", disabled: true }),
      division: new FormControl({ value: "Vijayawada", disabled: true }),
      department: new FormControl({ value: "Signal", disabled: true }),
      signalType: new FormControl(this.signal.metadata.signalType),
      subsidiaryType: new FormControl(this.signal.metadata.subsidiaryType),
      typeOfUnit: new FormControl(this.signal.metadata.typeOfUnit),
      signalName: new FormControl(this.signal.name),
      serialNumber: new FormControl(this.signal.metadata.serialNumber),
      milegeInKM: new FormControl(this.signal.metadata.milegeInKM),
      implantation: new FormControl(this.signal.metadata.implantation),
      sacrificialMast: new FormControl(this.signal.metadata.sacrificialMast),
      codalLife: new FormControl(this.signal.metadata.codalLife),
      remarks: new FormControl(this.signal.metadata.remarks),
      dateOfManufacture: new FormControl(this.signal.dateOfManufacture),
      dateOfInstallation: new FormControl(this.signal.dateOfInstallation),
      make: new FormControl(this.signal.make),
      model: new FormControl(this.signal.model),
      signalBaseInstallation: new FormControl(this.signal.signalBaseInstallation),
      signalPostInstallation: new FormControl(this.signal.signalPostInstallation),
      latitude: new FormControl(this.signal.latitude),
      longitude: new FormControl(this.signal.longitude),
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
        remarks: this.addAssetForm.value["remarks"],
        signalBaseInstallation: this.addAssetForm.value["dateOfManufacture"]
    };

    modelCopy["metaData"] = metadata;
    if (this.signal.id > 0) {
      this.SignalService.updateSignal(modelCopy).then(signals => {
        window.location.href = '/#/signals';
        console.log(signals);
      });
    }
    else {
      this.SignalService
        .addSignal(modelCopy)
        .then(signals => {
          window.location.href = '/#/signals';
          console.log(signals);
        });
    }
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

export class Signal {
  public id: number;
  public station: string;
  public zone: string;
  public division: string;
  public department: string;
  public name: string;
  public dateOfManufacture: string;
  public dateOfInstallation: string;
  public make: string;
  public model: string;
  public signalBaseInstallation: string;
  public signalPostInstallation: string;
  public latitude: string;
  public longitude: string;
  public metadata: SignalMetaData;

  constructor(args) {
    this.id = args.id;
    this.station = args.station;
    this.zone = args.zone;
    this.division = args.division;
    this.department = args.department;
    this.dateOfManufacture = args.dateOfManufacture;
    this.dateOfInstallation = args.dateOfInstallation;
    this.make = args.make;
    this.name = args.name;
    this.model = args.model;
    this.signalBaseInstallation = args.signalBaseInstallation;
    this.signalPostInstallation = args.signalPostInstallation;
    this.latitude = args.latitude;
    this.longitude = args.longitude;
    this.metadata = new SignalMetaData(args.metadata || {});
  }
}

export class SignalMetaData {
  public signalType: string;
  public subsidiaryType: string;
  public typeOfUnit: string;
  public serialNumber: string;
  public milegeInKM: string;
  public implantation: string;
  public sacrificialMast: string;
  public codalLife: string;
  public remarks: string;

  constructor(args) {
    this.signalType = args.signalType;
    this.subsidiaryType = args.subsidiaryType;
    this.typeOfUnit = args.typeOfUnit;
    this.serialNumber = args.serialNumber;
    this.milegeInKM = args.milegeInKM;
    this.implantation = args.implantation;
    this.sacrificialMast = args.sacrificialMast;
    this.codalLife = args.codalLife;
    this.remarks = args.remarks;
  }
}
