import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Signal } from '../add-signal/add-signal.component';
import { ActivatedRoute } from '@angular/router';
import { SignalMaintanenceService } from '../signal-service/signal-maintenance-service';

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
  public signalId: number;
  public signal: Signal = new Signal({});
  public maintananceId: number;
  public viewForm: boolean;
  public signalMaintanance: ColorLightSignalAssetMaintanence = new ColorLightSignalAssetMaintanence({});

  constructor(private SignalService: SignalService,
    private SignalMaintanenceService: SignalMaintanenceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.buildAddAssetForm();
    this.route.params.subscribe(params => {
      this.signalId = +params['id'];
      this.maintananceId = +params['mid'];
    });
  }

  ngOnInit() {
    this.buildAddAssetForm();
    if (this.maintananceId > 0) {
      this.SignalMaintanenceService.getSignal(this.maintananceId).then(main => {
        this.signalMaintanance = main;
        this.viewForm = true;
        this.buildAddAssetForm();
      });
    }
    else if (this.signalId > 0) {
      this.SignalService.getSignal(this.signalId).then(sig => {
        this.signal = new Signal(sig);
        this.signalMaintanance.name = this.signal.name;
        this.signalMaintanance.assetLatitude = this.signal.latitude;
        this.signalMaintanance.assetLongitude = this.signal.longitude;
        this.signalMaintanance.stationName = this.signal.stationName;
        this.buildAddAssetForm();
      });
    }
  }

  buildAddAssetForm() {
    this.addAssetMaintanenceForm = this.formBuilder.group({
      stationName: new FormControl({ value: this.signalMaintanance.stationName, disabled: true }),
      signalName: new FormControl({ value: this.signalMaintanance.name, disabled: true }),
      slatitude: new FormControl({ value: this.signalMaintanance.assetLatitude, disabled: true }),
      slongitude: new FormControl({ value: this.signalMaintanance.assetLongitude, disabled: true }),
      latitude: new FormControl({ value: this.signalMaintanance.latitiude, disabled: this.viewForm }),
      longitude: new FormControl({ value: this.signalMaintanance.longitude, disabled: this.viewForm }),
      serialNumber: new FormControl({ value: this.signal.metadata.serialNumber, disabled: true }),
      make: new FormControl({ value: this.signal.make, disabled: true }),
      model: new FormControl({ value: this.signal.model, disabled: true }),
      metadata: new FormGroup({
      cleanSignal: new FormControl({ value: this.signalMaintanance.metadata.cleanSignal, disabled: this.viewForm }),
        smcData: new FormGroup({
          maintanenceType: new FormControl({ value: this.signalMaintanance.metadata.smcData.maintanenceType, disabled: this.viewForm }),
          aspect: new FormControl({ value: this.signalMaintanance.metadata.smcData.aspect, disabled: this.viewForm }),
          make: new FormControl({ value: this.signalMaintanance.metadata.smcData.make, disabled: this.viewForm }),
          model: new FormControl({ value: this.signalMaintanance.metadata.smcData.model, disabled: this.viewForm }),
          aspectNumber: new FormControl({ value: this.signalMaintanance.metadata.smcData.aspectNumber, disabled: this.viewForm }),
          version: new FormControl({ value: this.signalMaintanance.metadata.smcData.version, disabled: this.viewForm }),
          aspectColor: new FormControl({ value: this.signalMaintanance.metadata.smcData.aspectColor, disabled: this.viewForm }),
          serialNumber: new FormControl({ value: this.signalMaintanance.metadata.smcData.serialNumber, disabled: this.viewForm }),
          dateOfManufacture: new FormControl({ value: this.signalMaintanance.metadata.smcData.dateOfManufacture, disabled: this.viewForm }),
          dateOfInstallation: new FormControl({ value: this.signalMaintanance.metadata.smcData.dateOfInstallation, disabled: this.viewForm }),
          lifeInMonths: new FormControl({ value: this.signalMaintanance.metadata.smcData.lifeInMonths, disabled: this.viewForm }),
          midLifeRehabilation: new FormControl({ value: this.signalMaintanance.metadata.smcData.midLifeRehabilation, disabled: this.viewForm }),
          remarks: new FormControl({ value: this.signalMaintanance.metadata.smcData.remarks, disabled: this.viewForm }),
        }),
        recordBook: new FormGroup({
          rgVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.rgVoltage, disabled: this.viewForm }),
          dgVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.dgVoltage, disabled: this.viewForm }),
          hgVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.hgVoltage, disabled: this.viewForm }),
          hhgVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.hhgVoltage, disabled: this.viewForm }),
          cogVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.cogVoltage, disabled: this.viewForm }),
          amarker: new FormControl({ value: this.signalMaintanance.metadata.recordBook.amarker, disabled: this.viewForm }),
          agmarker: new FormControl({ value: this.signalMaintanance.metadata.recordBook.agmarker, disabled: this.viewForm }),
          cmarker: new FormControl({ value: this.signalMaintanance.metadata.recordBook.cmarker, disabled: this.viewForm }),
          routeIndicator: new FormControl({ value: this.signalMaintanance.metadata.recordBook.routeIndicator, disabled: this.viewForm }),
          schedule: new FormControl({ value: this.signalMaintanance.metadata.recordBook.schedule, disabled: this.viewForm }),
          remarks: new FormControl({ value: this.signalMaintanance.metadata.recordBook.remarks, disabled: this.viewForm }),
          faulty: new FormControl({ value: this.signalMaintanance.metadata.recordBook.faulty, disabled: this.viewForm }),
        }),
      }),
      
    });
  }         

  saveAssetMaintanence(): void {
    const modelCopy = this.addAssetMaintanenceForm.value;
    modelCopy["assetId"] = this.signal.id;

    this.SignalMaintanenceService
        .addSignal(modelCopy)
        .then(signals => {
          window.location.href = '/#/signals';
          console.log(signals);
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

export class ColorLightSignalAssetMaintanence {
  public id: number;
  public addedBy: number;
  public assetId: number;
  public addedOn: Date;
  public latitiude: string;
  public longitude: string;
  public displayName: string;
  public designation: string;
  public name: string;
  public stationId: number;
  public stationName: string;
  public assetLatitude: string;
  public assetLongitude: string;
  public serialNumber: string;
  public make: string;
  public model: string;

  public metadata: ColorLightSignalMaintanenceMetadata;

  constructor(args) {
    this.id = args.id;
    this.assetId = args.assetId;
    this.displayName = args.displayName;
    this.designation = args.designation;
    this.name = args.name;
    this.stationId = args.stationId;
    this.stationName = args.stationName;
    this.assetLatitude = args.assetLatitude;
    this.assetLongitude = args.assetLongitude;
    this.addedBy = args.addedBy;
    this.addedOn = args.addedOn;
    this.latitiude = args.latitiude;
    this.longitude = args.longitude;
    this.serialNumber = args.serialNumber;
    this.make = args.make;
    this.model = args.model;
    this.metadata = new ColorLightSignalMaintanenceMetadata(args.metadata || {}); 
  }

}

export class ColorLightSignalMaintanenceMetadata {
  public cleanSignal: boolean;
  public smcData: SMCData;
  public recordBook: RecordBook;

  constructor(args) {
    this.cleanSignal = args.cleanSignal;
    this.smcData = new SMCData(args.smcData || {});
    this.recordBook = new RecordBook(args.recordBook || {});

  }
}

export class SMCData {
  public maintanenceType: number;
  public aspect: string;
  public make: string;
  public model: string;
  public aspectNumber: string;
  public version: string;
  public aspectColor: string;
  public serialNumber: string;
  public dateOfManufacture: Date;
  public dateOfInstallation: Date;
  public lifeInMonths: string;
  public midLifeRehabilation: string;
  public remarks: string;

  constructor(args) {
    this.maintanenceType = args.maintanenceType;
    this.aspect = args.aspect;
    this.make = args.make;
    this.model = args.model;
    this.aspectNumber = args.aspectNumber;
    this.version = args.version;
    this.aspectColor = args.aspectColor;
    this.serialNumber = args.serialNumber;
    this.dateOfManufacture = args.dateOfManufacture;
    this.dateOfInstallation = args.dateOfInstallation;
    this.lifeInMonths = args.lifeInMonths;
    this.midLifeRehabilation = args.midLifeRehabilation;
    this.remarks = args.remarks;
  }

}

export class RecordBook {
  public rgVoltage: string;
  public dgVoltage: string;
  public hgVoltage: string;
  public hhgVoltage: string;
  public cogVoltage: string;
  public amarker: string;
  public agmarker: string;
  public cmarker: string;
  public routeIndicator: string;
  public schedule: string;
  public remarks: string;
  public faulty: string;

  constructor(args: RecordBook) {
    this.rgVoltage = args.rgVoltage;
    this.dgVoltage = args.dgVoltage;
    this.hgVoltage = args.hgVoltage;
    this.hhgVoltage = args.hhgVoltage;
    this.cogVoltage = args.cogVoltage;
    this.amarker = args.amarker;
    this.agmarker = args.agmarker;
    this.cmarker = args.cmarker;
    this.routeIndicator = args.routeIndicator;
    this.schedule = args.schedule;
    this.remarks = args.remarks;
    this.faulty = args.faulty;
  }
}
