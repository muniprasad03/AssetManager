import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Axel } from '../AxelCounter/add-axel/add-axel.component';
import { AxelService } from '../AxelCounter/axel-service';
import { AxelMaintanenceService } from '../AxelCounter/axel-maintenance-service';
import { ActivatedRoute } from '@angular/router';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-add-axel-maintanece',
  templateUrl: './add-axel-maintanece.component.html',
  styleUrls: ['./add-axel-maintanece.component.css']
})
export class AddAxelMaintaneceComponent implements OnInit {


  public addAssetMaintanenceForm: FormGroup;
  public signalId: number;
  public signal: Axel = new Axel({});
  public maintananceId: number;
  public viewForm: boolean;
  public signalMaintanance: AxelAssetMaintanence = new AxelAssetMaintanence({});

  constructor(private SignalService: AxelService,
    private SignalMaintanenceService: AxelMaintanenceService,
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
        this.signal = new Axel(sig);
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
        outDoor: new FormControl({ value: this.signalMaintanance.metadata.outDoor, disabled: this.viewForm }),
        packingCondition: new FormControl({ value: this.signalMaintanance.metadata.packingCondition, disabled: this.viewForm }),
        connectedEquipmentCondition: new FormControl({ value: this.signalMaintanance.metadata.connectedEquipmentCondition, disabled: this.viewForm }),
        electricalCondition: new FormControl({ value: this.signalMaintanance.metadata.electricalCondition, disabled: this.viewForm }),
        recordBook: new FormGroup({
          channelType: new FormControl({ value: this.signalMaintanance.metadata.recordBook.channelType, disabled: this.viewForm }),
          dCInputVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.dCInputVoltage, disabled: this.viewForm }),
          oscVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.oscVoltage, disabled: this.viewForm }),
          frequency: new FormControl({ value: this.signalMaintanance.metadata.recordBook.frequency, disabled: this.viewForm }),
          staggering: new FormControl({ value: this.signalMaintanance.metadata.recordBook.staggering, disabled: this.viewForm }),
          chInAChannel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInAChannel, disabled: this.viewForm }),
          chInADip: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInADip, disabled: this.viewForm }),
          chInACrossLevel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInACrossLevel, disabled: this.viewForm }),
          chInBChannel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInBChannel, disabled: this.viewForm }),
          chInBDip: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInBDip, disabled: this.viewForm }),
          chInBCrossLevel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInBCrossLevel, disabled: this.viewForm }),
          chInCChannel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInCChannel, disabled: this.viewForm }),
          chInCDip: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInCDip, disabled: this.viewForm }),
          chInCCrossLevel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInCCrossLevel, disabled: this.viewForm }),
          chInDChannel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInDChannel, disabled: this.viewForm }),
          chInDDip: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInDDip, disabled: this.viewForm }),
          chInDCrossLevel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chInDCrossLevel, disabled: this.viewForm }),
          chOutAChannel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutAChannel, disabled: this.viewForm }),
          chOutADip: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutADip, disabled: this.viewForm }),
          chOutACrossLevel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutACrossLevel, disabled: this.viewForm }),
          chOutBChannel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutBChannel, disabled: this.viewForm }),
          chOutBDip: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutBDip, disabled: this.viewForm }),
          chOutBCrossLevel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutBCrossLevel, disabled: this.viewForm }),
          chOutCChannel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutCChannel, disabled: this.viewForm }),
          chOutCDip: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutCDip, disabled: this.viewForm }),
          chOutCCrossLevel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutCCrossLevel, disabled: this.viewForm }),
          chOutDChannel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutDChannel, disabled: this.viewForm }),
          chOutDDip: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutDDip, disabled: this.viewForm }),
          chOutDCrossLevel: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chOutDCrossLevel, disabled: this.viewForm }),
          remarks: new FormControl({ value: this.signalMaintanance.metadata.recordBook.remarks, disabled: this.viewForm }),
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
        window.location.href = '/#/axels';
        console.log(signals);
      });
  }

}


export class AxelAssetMaintanence {
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

  public metadata: AxelMaintanenceMetadata;

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
    this.metadata = new AxelMaintanenceMetadata(args.metadata || {});
  }
}


export class AxelMaintanenceMetadata {
  public outDoor: boolean;
  public packingCondition: boolean;
  public connectedEquipmentCondition: boolean;
  public electricalCondition: boolean;
  public recordBook: RecordBook;
  constructor(args) {
    this.outDoor = args.outDoor;
    this.packingCondition = args.packingCondition;
    this.connectedEquipmentCondition = args.connectedEquipmentCondition;
    this.electricalCondition = args.electricalCondition;
    this.recordBook = new RecordBook(args.recordBook || {});
  }
}

export class RecordBook {
  public channelType: string;
  public dCInputVoltage: string;
  public oscVoltage: string;
  public frequency: string;
  public staggering: string;
  public chInAChannel: string;
  public chInADip: string;
  public chInACrossLevel: string;
  public chInBChannel: string;
  public chInBDip: string;
  public chInBCrossLevel: string;
  public chInCChannel: string;
  public chInCDip: string;
  public chInCCrossLevel: string;
  public chInDChannel: string;
  public chInDDip: string;
  public chInDCrossLevel: string;
  public chOutAChannel: string;
  public chOutADip: string;
  public chOutACrossLevel: string;
  public chOutBChannel: string;
  public chOutBDip: string;
  public chOutBCrossLevel: string;
  public chOutCChannel: string;
  public chOutCDip: string;
  public chOutCCrossLevel: string;
  public chOutDChannel: string;
  public chOutDDip: string;
  public chOutDCrossLevel: string;
  public remarks: string;

  constructor(args) {
    this.channelType = args.channelType || "A-B";
    this.dCInputVoltage = args.dCInputVoltage;
    this.oscVoltage = args.oscVoltage;
    this.frequency = args.frequency;
    this.staggering = args.staggering;
    this.chInAChannel = args.chInAChannel;
    this.chInADip = args.chInADip;
    this.chInACrossLevel = args.chInACrossLevel;
    this.chInBChannel = args.chInBChannel;
    this.chInBDip = args.chInBDip;
    this.chInBCrossLevel = args.chInBCrossLevel;
    this.chInCChannel = args.chInCChannel;
    this.chInCDip = args.chInCDip;
    this.chInCCrossLevel = args.chInCCrossLevel;
    this.chInDChannel = args.chInDChannel;
    this.chInDDip = args.chInDDip;
    this.chInDCrossLevel = args.chInDCrossLevel;
    this.chOutAChannel = args.chOutAChannel;
    this.chOutADip = args.chOutADip;
    this.chOutACrossLevel = args.chOutACrossLevel;
    this.chOutBChannel = args.chOutBChannel;
    this.chOutBDip = args.chOutBDip; 
    this.chOutBCrossLevel = args.chOutBCrossLevel;
    this.chOutCChannel = args.chOutCChannel;
    this.chOutCDip = args.chOutCDip;
    this.chOutCCrossLevel = args.chOutCCrossLevel;
    this.chOutDChannel = args.chOutDChannel;
    this.chOutDDip = args.chOutDDip;
    this.chOutDCrossLevel = args.chOutDCrossLevel;
    this.remarks = args.remarks;
  }
}
