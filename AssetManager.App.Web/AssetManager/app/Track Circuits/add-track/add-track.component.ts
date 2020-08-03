import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TrackService } from '../track-service';
import { StationService } from '../../station-Service/station-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.css']
})
export class AddTrackComponent implements OnInit {
  public addAssetForm: FormGroup;
  public scannedData: any;
  public hasPermission: boolean;
  public signalId: number;
  public signal: TrackCircuitAsset = new TrackCircuitAsset({});
  public stations = [];
  existingName: string;
  enableScanner = false;
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
  constructor(private trackService: TrackService,
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
      this.trackService.getSignal(this.signalId).then(sig => {
        this.existingName = sig.name;
        this.signal = new TrackCircuitAsset(sig);
        this.signal.dateOfManufacture = this.signal.dateOfManufacture != null ? new Date(this.signal.dateOfManufacture) : null;
        this.signal.dateOfInstallation = this.signal.dateOfInstallation != null ? new Date(this.signal.dateOfInstallation) : null;
        this.buildAddAssetForm();
      });
    }
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
      detectionDeviceType: new FormControl(this.signal.metadata.detectionDeviceType),
      dateOfInstallation: new FormControl(this.signal.dateOfInstallation),
      redundancyType: new FormControl(this.signal.metadata.redundancyType),
      name: new FormControl(this.signal.name, {
        validators: Validators.required,
        asyncValidators: [this.isNameUnique.bind(this)], updateOn: 'blur',
      }),
      serialNumber: new FormControl(this.signal.metadata.serialNumber),
      codalLife: new FormControl(this.signal.metadata.codalLife),
      dateOfManufacture: new FormControl(this.signal.dateOfManufacture),
      fmFm: new FormControl(this.signal.metadata.fmFm),
      fmBSLSt: new FormControl(this.signal.metadata.fmBSLSt),
      fmBSLTO: new FormControl(this.signal.metadata.fmBSLTO),
      fmHomeTO: new FormControl(this.signal.metadata.fmHomeTO),
      remarks: new FormControl(this.signal.metadata.remarks),
      make: new FormControl(this.signal.make),
      model: new FormControl(this.signal.model),
      fmHomeStraight: new FormControl(this.signal.metadata.fmHomeStraight),
      loopLine: new FormControl(this.signal.metadata.loopLine),
      sliding: new FormControl(this.signal.metadata.sliding),
      otherGoodsLine: new FormControl(this.signal.metadata.otherGoodsLine),
      loopLineNo: new FormControl(this.signal.metadata.loopLineNo),
      slidingNo: new FormControl(this.signal.metadata.slidingNo),
      otherGoodsNo: new FormControl(this.signal.metadata.otherGoodsNo),
      tcLength: new FormControl(this.signal.metadata.tcLength),
      tcLineType: new FormControl(this.signal.metadata.tcLineType),
      platform: new FormControl(this.signal.metadata.platform),
      platformLine: new FormControl(this.signal.metadata.platformLine),
      tcLocationBxJumperLocation1: new FormControl(this.signal.metadata.tcLocationBxJumperLocation1),
      tcLocationBxJumperLocation2: new FormControl(this.signal.metadata.tcLocationBxJumperLocation2),
      tcLocationBxJumperLocation3: new FormControl(this.signal.metadata.tcLocationBxJumperLocation3),
      tcLocationFromFeedEnd: new FormControl(this.signal.metadata.tcLocationFromFeedEnd),
      tcLocationFromRelayEnd: new FormControl(this.signal.metadata.tcLocationFromRelayEnd),
      latitude: new FormControl(this.signal.latitude),
      longitude: new FormControl(this.signal.longitude),
    });
  }

  isNameUnique = (control: FormControl): Promise<{ [key: string]: any } | null> => {
    return new Promise((resolve, reject) => {
      const value: string = control.value;
      if (this.existingName === value) {
        resolve(null);
      } else {
        this.trackService.getValidationOfSignalName(this.signal.id, value).subscribe(isExists => {
          isExists ? resolve({ duplicate: true }) : resolve(null);
        }, error => {
          resolve(null);
        });
      }
    });
  }


  saveAsset(): void {
    this.formSubmitted = true;
    if (!this.addAssetForm.valid) { return; }
    const modelCopy = this.addAssetForm.value;
    const metadata = new TrackCircuitMetadata(this.addAssetForm.value || {})
    if (modelCopy.stationId > 0) {
      var station = this.stations.find(st => st.id == modelCopy.stationId);
      modelCopy.stationName = station.name;
    }
    modelCopy["metaData"] = metadata;
    if (this.signal.id > 0) {
      this.trackService.updateSignal(modelCopy).then(signals => {
        window.location.href = '/#/tracks';
        console.log(signals);
      });
    }
    else {
      this.trackService
        .addSignal(modelCopy)
        .then(signals => {
          window.location.href = '/#/tracks';
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

export class TrackCircuitAsset {
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
  public metadata: TrackCircuitMetadata;

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
    this.metadata = new TrackCircuitMetadata(args.metadata || {});
  }
}


export class TrackCircuitMetadata {
  public codalLife: string;
  public serialNumber: string;
  public detectionDeviceType: string;
  public make: string;
  public redundancyType: string;
  public tcLineType: string;
  public platform: string;
  public platformLine: string;
  public tcLength: string;
  public tcLocationFromRelayEnd: string;
  public tcLocationBxJumperLocation1: string;
  public tcLocationBxJumperLocation2: string;
  public tcLocationBxJumperLocation3: string;
  public tcLocationFromFeedEnd: string;
  public fmFm: boolean;
  public fmBSLSt: boolean;
  public fmBSLTO: boolean;
  public fmHomeStraight: boolean;
  public fmHomeTO: boolean;
  public loopLine: boolean;
  public sliding: boolean;
  public otherGoodsLine: boolean;
  public loopLineNo: string;
  public slidingNo: string;
  public otherGoodsNo: string;
  public remarks: string;


  constructor(args) {
    this.codalLife = args.codalLife;
    this.serialNumber = args.serialNumber;
    this.detectionDeviceType = args.detectionDeviceType;
    this.make = args.make;
    this.redundancyType = args.redundancyType;
    this.tcLineType = args.tcLineType;
    this.platform = args.platform;
    this.platformLine = args.platformLine;
    this.tcLength = args.tcLength;
    this.tcLocationFromRelayEnd = args.tcLocationFromRelayEnd;
    this.tcLocationBxJumperLocation1 = args.tcLocationBxJumperLocation1;
    this.tcLocationBxJumperLocation2 = args.tcLocationBxJumperLocation2;
    this.tcLocationBxJumperLocation3 = args.tcLocationBxJumperLocation3;
    this.tcLocationFromFeedEnd = args.tcLocationFromFeedEnd;
    this.fmFm = args.fmFm;
    this.fmBSLSt = args.fmBSLSt;
    this.fmBSLTO = args.fmBSLTO;
    this.fmHomeStraight = args.fmHomeStraight;
    this.fmHomeTO = args.fmHomeTO;
    this.loopLine = args.loopLine;
    this.sliding = args.sliding;
    this.otherGoodsLine = args.otherGoodsLine;
    this.loopLineNo = args.loopLineNo;
    this.slidingNo = args.slidingNo;
    this.otherGoodsNo = args.otherGoodsNo;
    this.remarks = args.remarks;
  }
}
