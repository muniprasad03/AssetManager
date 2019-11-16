import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PointService } from '../../point/point-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BsModalRef } from 'ngx-bootstrap';
import { StationService } from '../../station-Service/station-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.css']
})
export class AddPointComponent implements OnInit {

  public addAssetForm: FormGroup;
  public scannedData: any;
  public hasPermission: boolean;
  enableScanner = false;
  public signalId: number;
  public signal: Point = new Point({});
  public stations = [];
  existingName: string;
  formSubmitted: boolean;
  validationMessages = {
    'name': [
      { type: 'required', message: 'Required' },
      { type: 'duplicate', message: 'Duplicate Name' },
    ],
    'stationId': [
      { type: 'required', message: 'Required' },
    ]
  };
  constructor(private SignalService: PointService,
    private stationSevice: StationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.stationSevice.getStations().then(st => {
      this.stations = st;
    });
    this.buildAddAssetForm();
    this.route.params.subscribe(params => {
      this.signalId = +params['id'];
    });
  }

  ngOnInit() {
    if (this.signalId > 0) {
      this.SignalService.getSignal(this.signalId).then(sig => {
        this.existingName = sig.name;
        this.signal = new Point(sig);
        this.signal.dateOfManufacture = this.signal.dateOfManufacture != null ? new Date(this.signal.dateOfManufacture) : null;
        this.signal.dateOfInstallation = this.signal.dateOfInstallation != null ? new Date(this.signal.dateOfInstallation) : null;
        this.signal.metadata.groundConnectionDateOfInstallation = this.signal.metadata.groundConnectionDateOfInstallation != null ? new Date(this.signal.metadata.groundConnectionDateOfInstallation) : null;
        this.buildAddAssetForm();
      });
    }
  }


  isNameUnique = (control: FormControl): Promise<{ [key: string]: any } | null> => {
    return new Promise((resolve, reject) => {
      const value: string = control.value;
      if (this.existingName === value) {
        resolve(null);
      } else {
        this.SignalService.getValidationOfSignalName(this.signal.id, value).subscribe(isExists => {
          isExists ? resolve({ duplicate: true }) : resolve(null);
        }, error => {
          resolve(null);
        });
      }
    });
  }

  buildAddAssetForm() {
    this.addAssetForm = this.formBuilder.group({
      id: new FormControl(this.signal.id),
      stationId: new FormControl(this.signal.stationId, {
        validators: Validators.required
      }),
      zone: new FormControl({ value: "South Central Railway", disabled: true }),
      division: new FormControl({ value: "Vijayawada", disabled: true }),
      department: new FormControl({ value: "Signal", disabled: true }),
      name: new FormControl(this.signal.name, {
        validators: Validators.required,
        asyncValidators: [this.isNameUnique.bind(this)], updateOn: 'blur',
      }),
      dateOfManufacture: new FormControl(this.signal.dateOfManufacture),
      dateOfInstallation: new FormControl(this.signal.dateOfInstallation),
      latitude: new FormControl(this.signal.latitude),
      longitude: new FormControl(this.signal.longitude),
      make: new FormControl(this.signal.make),
      model: new FormControl(this.signal.model),
      serialNumber: new FormControl(this.signal.metadata.serialNumber),
      codalLife: new FormControl(this.signal.metadata.codalLife),
      remarks: new FormControl(this.signal.metadata.remarks),
      locationDistance: new FormControl(this.signal.metadata.locationDistance),
      lineType: new FormControl(this.signal.metadata.lineType),
      version: new FormControl(this.signal.metadata.version),
      turnOutType: new FormControl(this.signal.metadata.turnOutType),
      railType: new FormControl(this.signal.metadata.railType),
      typeCurve: new FormControl(this.signal.metadata.typeCurve),
      hCurveType: new FormControl(this.signal.metadata.hCurveType),
      sleeperType: new FormControl(this.signal.metadata.sleeperType),
      noOfGaugeTiePlate: new FormControl(this.signal.metadata.noOfGaugeTiePlate),
      noOfGaugeTiePlateInsulationsSets: new FormControl(this.signal.metadata.noOfGaugeTiePlateInsulationsSets),
      noOfWilliamStretcherBar: new FormControl(this.signal.metadata.noOfWilliamStretcherBar),
      noOfWilliamStretcherBarInsulationsSets: new FormControl(this.signal.metadata.noOfWilliamStretcherBarInsulationsSets),
      pointMachineType: new FormControl(this.signal.metadata.pointMachineType),
      strock: new FormControl(this.signal.metadata.strock),
      springSettingDevice: new FormControl(this.signal.metadata.springSettingDevice),
      acImmunisation: new FormControl(this.signal.metadata.acImmunisation),
      groundConnectionDateOfInstallation: new FormControl(this.signal.metadata.groundConnectionDateOfInstallation)
    });
  }

  saveAsset(): void {
    this.formSubmitted = true;
    if (!this.addAssetForm.valid) { return; }
    const modelCopy = this.addAssetForm.value;
    const metadata = new PointMetaData(this.addAssetForm.value || {})
    if (modelCopy.stationId > 0) {
      var station = this.stations.find(st => st.id == modelCopy.stationId);
      modelCopy.stationName = station.name;
    }
    modelCopy["metaData"] = metadata;
    if (this.signal.id > 0) {
      this.SignalService.updateSignal(modelCopy).then(signals => {
        window.location.href = '/#/points';
        console.log(signals);
      });
    }
    else {
      this.SignalService
        .addSignal(modelCopy)
        .then(signals => {
          window.location.href = '/#/points';
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


export class Point {
  public id: number;
  public stationName: string;
  public stationId: number;
  public zone: string;
  public division: string;
  public department: string;
  public name: string;
  public dateOfManufacture: any;
  public dateOfInstallation: any;
  public make: string;
  public model: string;
  public latitude: string;
  public longitude: string;
  public metadata: PointMetaData;

  constructor(args) {
    this.id = args.id;
    this.stationName = args.stationName;
    this.stationId = args.stationId;
    this.zone = args.zone;
    this.division = args.division;
    this.department = args.department;
    this.dateOfManufacture = args.dateOfManufacture;
    this.dateOfInstallation = args.dateOfInstallation;
    this.make = args.make;
    this.name = args.name;
    this.model = args.model;
    this.latitude = args.latitude;
    this.longitude = args.longitude;
    this.metadata = new PointMetaData(args.metadata || {});
  }
}

export class PointMetaData {

  public serialNumber: string;
  public version: string;
  public lineType: string;
  public turnOutType: string;
  public railType: string;
  public typeCurve: string;
  public hCurveType: string;
  public sleeperType: string;
  public locationDistance: string;
  public noOfGaugeTiePlate: number;
  public noOfGaugeTiePlateInsulationsSets: number;
  public noOfWilliamStretcherBar: number;
  public noOfWilliamStretcherBarInsulationsSets: number;
  public pointMachineType: string;
  public strock: string;
  public springSettingDevice: string;
  public codalLife: number;
  public acImmunisation: number;
  public groundConnectionDateOfInstallation: any;
  public remarks: string;

  constructor(args) {
    this.serialNumber = args.serialNumber;
    this.version = args.version;
    this.lineType = args.lineType;
    this.turnOutType = args.turnOutType;
    this.railType = args.railType;
    this.typeCurve = args.typeCurve;
    this.hCurveType = args.hCurveType;
    this.sleeperType = args.sleeperType;
    this.noOfGaugeTiePlate = args.noOfGaugeTiePlate;
    this.noOfGaugeTiePlateInsulationsSets = args.noOfGaugeTiePlateInsulationsSets;
    this.noOfWilliamStretcherBar = args.noOfWilliamStretcherBar;
    this.noOfWilliamStretcherBarInsulationsSets = args.noOfWilliamStretcherBarInsulationsSets;
    this.pointMachineType = args.pointMachineType;
    this.strock = args.strock || "143 MM";
    this.springSettingDevice = args.springSettingDevice;
    this.codalLife = args.codalLife;
    this.acImmunisation = args.acImmunisation;
    this.groundConnectionDateOfInstallation = args.groundConnectionDateOfInstallation;
    this.remarks = args.remarks;
    this.locationDistance = args.locationDistance;
  }
}


