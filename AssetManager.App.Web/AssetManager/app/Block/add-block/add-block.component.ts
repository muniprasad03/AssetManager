import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BlockService } from '../block-service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StationService } from '../../station-Service/station-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.css']
})
export class AddBlockComponent implements OnInit {

  public addAssetForm: FormGroup;
  public scannedData: any;
  public hasPermission: boolean;
  enableScanner = false;
  public signalId: number;
  public signal: Block = new Block({});
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
  constructor(private SignalService: BlockService,
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
        this.signal = new Block(sig);
        this.signal.dateOfManufacture = this.signal.dateOfManufacture != null ? new Date(this.signal.dateOfManufacture) : null;
        this.signal.dateOfInstallation = this.signal.dateOfInstallation != null ? new Date(this.signal.dateOfInstallation) : null;
        this.signal.metadata.overhauling = this.signal.metadata.overhauling != null ? new Date(this.signal.metadata.overhauling) : null;
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

      type: new FormControl(this.signal.metadata.type),
      identifierName: new FormControl(this.signal.metadata.identifierName),
      location: new FormControl(this.signal.metadata.location),
      locationDistance: new FormControl(this.signal.metadata.locationDistance),
      internalSupply: new FormControl(this.signal.metadata.internalSupply),
      externalSupply: new FormControl(this.signal.metadata.externalSupply),
      lineSupply: new FormControl(this.signal.metadata.lineSupply),
      internalCurrent: new FormControl(this.signal.metadata.internalCurrent),
      externalCurrent: new FormControl(this.signal.metadata.externalCurrent),
      lineCurrent: new FormControl(this.signal.metadata.lineCurrent),
      operatingRange: new FormControl(this.signal.metadata.operatingRange),
      overallDimension: new FormControl(this.signal.metadata.overallDimension),
      overhauling: new FormControl(this.signal.metadata.overhauling),
      weight: new FormControl(this.signal.metadata.weight),
    });
  }

  saveAsset(): void {
    this.formSubmitted = true;
    if (!this.addAssetForm.valid) { return; }
    const modelCopy = this.addAssetForm.value;
    const metadata = new BlockMetaData(this.addAssetForm.value || {})
    if (modelCopy.stationId > 0) {
      var station = this.stations.find(st => st.id == modelCopy.stationId);
      modelCopy.stationName = station.name;
    }
    modelCopy["metaData"] = metadata;
    if (this.signal.id > 0) {
      this.SignalService.updateSignal(modelCopy).then(signals => {
        window.location.href = '/#/blocks';
        console.log(signals);
      });
    }
    else {
      this.SignalService
        .addSignal(modelCopy)
        .then(signals => {
          window.location.href = '/#/blocks';
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


export class Block {
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
  public metadata: BlockMetaData;

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
    this.metadata = new BlockMetaData(args.metadata || {});
  }
}


export class BlockMetaData {
  public codalLife: number;
  public serialNumber: string;
  public type: string;
  public identifierName: string;
  public location: string;
  public locationDistance: string;
  public internalSupply: number;
  public externalSupply: number;
  public lineSupply: number;
  public internalCurrent: number;
  public externalCurrent: number;
  public lineCurrent: number;
  public operatingRange: string;
  public overallDimension: string;
  public weight: string;
  public remarks: string;
  public overhauling: any;

  constructor(args: BlockMetaData) {
    this.codalLife = args.codalLife;
    this.serialNumber = args.serialNumber;
    this.type = args.type;
    this.identifierName = args.identifierName;
    this.location = args.location;
    this.locationDistance = args.locationDistance;
    this.internalSupply = args.internalSupply;
    this.externalSupply = args.externalSupply;
    this.lineSupply = args.lineSupply;
    this.internalCurrent = args.internalCurrent;
    this.externalCurrent = args.externalCurrent;
    this.lineCurrent = args.lineCurrent;
    this.operatingRange = args.operatingRange;
    this.overallDimension = args.overallDimension;
    this.weight = args.weight;
    this.remarks = args.remarks;
    this.overhauling = args.overhauling;
  }
}
