import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Point } from '../point/add-point/add-point.component';
import { PointService } from '../point/point-service';
import { PointMaintanenceService } from '../Point/point-maintenance-service';

@Component({
  selector: 'app-add-point-maintanece',
  templateUrl: './add-point-maintanece.component.html',
  styleUrls: ['./add-point-maintanece.component.css']
})
export class AddPointMaintaneceComponent implements OnInit {

  public addAssetMaintanenceForm: FormGroup;
  public signalId: number;
  public signal: Point = new Point({});
  public maintananceId: number;
  public viewForm: boolean;
  public signalMaintanance: PointAssetMaintanence = new PointAssetMaintanence({});

  constructor(private SignalService: PointService,
    private SignalMaintanenceService: PointMaintanenceService,
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
        this.signal = new Point(sig);
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
      pointName: new FormControl({ value: this.signalMaintanance.name, disabled: true }),
      slatitude: new FormControl({ value: this.signalMaintanance.assetLatitude, disabled: true }),
      slongitude: new FormControl({ value: this.signalMaintanance.assetLongitude, disabled: true }),
      latitude: new FormControl({ value: this.signalMaintanance.latitiude, disabled: this.viewForm }),
      longitude: new FormControl({ value: this.signalMaintanance.longitude, disabled: this.viewForm }),
      serialNumber: new FormControl({ value: this.signal.metadata.serialNumber, disabled: true }),
      make: new FormControl({ value: this.signal.make, disabled: true }),
      model: new FormControl({ value: this.signal.model, disabled: true }),
      metadata: new FormGroup({
        isRustFree: new FormControl({ value: this.signalMaintanance.metadata.isRustFree, disabled: this.viewForm }),
        isPointChairsOiled: new FormControl({ value: this.signalMaintanance.metadata.isPointChairsOiled, disabled: this.viewForm }),
        isPointGearsOiled: new FormControl({ value: this.signalMaintanance.metadata.isPointGearsOiled, disabled: this.viewForm }),
        switchSetting: new FormControl({ value: this.signalMaintanance.metadata.switchSetting, disabled: this.viewForm }),
        ssdCondition: new FormControl({ value: this.signalMaintanance.metadata.ssdCondition, disabled: this.viewForm }),
        isObservationTest: new FormControl({ value: this.signalMaintanance.metadata.isObservationTest, disabled: this.viewForm }),
        nrsmcData: new FormGroup({
          motorMake: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.motorMake, disabled: this.viewForm }),
          motorSerialNumber: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.motorSerialNumber, disabled: this.viewForm }),
          dateOfManufacture: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.dateOfManufacture, disabled: true }),
          dateOfInstallation: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.dateOfInstallation, disabled: true }),
          peakLoad: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.peakLoad, disabled: this.viewForm }),
          normalLoad: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.normalLoad, disabled: this.viewForm }),
          obstructionLoad: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.obstructionLoad, disabled: this.viewForm }),
          voltageObstruction: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.voltageObstruction, disabled: this.viewForm }),
          voltageNormal: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.voltageNormal, disabled: this.viewForm }),
          wjrTiming: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.wjrTiming, disabled: this.viewForm }),
          operationFrom: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.operationFrom, disabled: true }),
          operationTo: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.operationTo, disabled: true }),
          remarks: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.remarks, disabled: this.viewForm }),
        }),
        rnsmcData: new FormGroup({
          motorMake: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.motorMake, disabled: this.viewForm }),
          motorSerialNumber: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.motorSerialNumber, disabled: this.viewForm }),
          dateOfManufacture: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.dateOfManufacture, disabled: true }),
          dateOfInstallation: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.dateOfInstallation, disabled: true }),
          peakLoad: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.peakLoad, disabled: this.viewForm }),
          normalLoad: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.normalLoad, disabled: this.viewForm }),
          obstructionLoad: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.obstructionLoad, disabled: this.viewForm }),
          voltageObstruction: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.voltageObstruction, disabled: this.viewForm }),
          voltageNormal: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.voltageNormal, disabled: this.viewForm }),
          wjrTiming: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.wjrTiming, disabled: this.viewForm }),
          operationFrom: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.operationFrom, disabled: true }),
          operationTo: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.operationTo, disabled: true }),
          remarks: new FormControl({ value: this.signalMaintanance.metadata.nrsmcData.remarks, disabled: this.viewForm }),
        }),
      }),

    });
  }

    saveAssetMaintanence(): void {
      const modelCopy = new PointAssetMaintanence(this.addAssetMaintanenceForm.value);
        modelCopy["assetId"] = this.signal.id;

        this.SignalMaintanenceService
            .addSignal(modelCopy)
            .then(signals => {
                window.location.href = '/#/points';
                console.log(signals);
            });
    }

   
}

export class PointAssetMaintanence {
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

  public metadata: PointMaintanenceMetadata;

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
    this.metadata = new PointMaintanenceMetadata(args.metadata || {});
  }
}

export class PointMaintanenceMetadata {
  public isRustFree: boolean;
  public isPointChairsOiled: boolean;
  public isPointGearsOiled: boolean;
  public switchSetting: boolean;
  public isObservationTest: boolean;
  public ssdCondition: boolean;
  public nrsmcData: PointSMCData;
  public rnsmcData: PointSMCData;

  constructor(args) {
    this.isRustFree = args.isRustFree;
    this.isPointChairsOiled = args.isPointChairsOiled;
    this.isPointGearsOiled = args.isPointGearsOiled;
    this.switchSetting = args.switchSetting;
    this.ssdCondition = args.ssdCondition;
    this.isObservationTest = args.isObservationTest;
      this.nrsmcData = new PointSMCData(args.nrsmcData || {});
    this.rnsmcData = new PointSMCData(args.rnsmcData || {});
    this.rnsmcData.operationTo = "N";
    this.nrsmcData.operationTo = "R";
    this.rnsmcData.operationFrom = "R";
    this.nrsmcData.operationFrom = "N";
    }
}

export class PointSMCData {
    public motorMake: string 
    public motorSerialNumber: string; 
    public dateOfManufacture: string; 
    public dateOfInstallation: string;
    public peakLoad: string;
    public normalLoad: string;
    public obstructionLoad: string;
    public voltageObstruction: string;
    public voltageNormal: string;
  public wjrTiming: string;
    public operationFrom: string;
    public operationTo: string;
    public remarks: string;

    constructor(args) {
        this.motorMake = args.motorMake;
        this.motorSerialNumber = args.motorSerialNumber;
        this.dateOfManufacture =  args.dateOfManufacture;
        this.dateOfInstallation = args.dateOfInstallation;
        this.peakLoad = args.dateOfInstallation;
        this.normalLoad = args.normalLoad;
        this.obstructionLoad = args.obstructionLoad;
        this.voltageObstruction = args.voltageObstruction;
        this.voltageNormal = args.voltageNormal;
      this.wjrTiming = args.wjrTiming;
        this.operationFrom = args.operationFrom;
        this.operationTo = args.operationTo;
        this.remarks = args.remarks;
    }

}
