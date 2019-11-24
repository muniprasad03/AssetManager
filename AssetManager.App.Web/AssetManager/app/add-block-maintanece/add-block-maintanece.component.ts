import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Signal } from '../add-signal/add-signal.component';
import { ActivatedRoute } from '@angular/router';
import { SignalMaintanenceService } from '../signal-service/signal-maintenance-service';
import { Block } from '../Block/add-block/add-block.component';
import { BlockService } from '../Block/block-service';
import { BlockMaintanenceService } from '../Block/block-maintenance-service';

@Component({
  selector: 'app-add-block-maintanece',
  templateUrl: './add-block-maintanece.component.html',
  styleUrls: ['./add-block-maintanece.component.css']
})
export class AddBlockMaintaneceComponent implements OnInit {

  public addAssetMaintanenceForm: FormGroup;
  public signalId: number;
  public signal: Block = new Block({});
  public maintananceId: number;
  public viewForm: boolean;
  public signalMaintanance: BlockAssetMaintanence = new BlockAssetMaintanence({});

  constructor(private SignalService: BlockService,
    private SignalMaintanenceService: BlockMaintanenceService,
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
        this.signal = new Block(sig);
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
        lockAndSeal: new FormControl({ value: this.signalMaintanance.metadata.lockAndSeal, disabled: this.viewForm }),
        smLock: new FormControl({ value: this.signalMaintanance.metadata.smLock, disabled: this.viewForm }),
        needleIndicator: new FormControl({ value: this.signalMaintanance.metadata.needleIndicator, disabled: this.viewForm }),
        conditionOfFitting: new FormControl({ value: this.signalMaintanance.metadata.conditionOfFitting, disabled: this.viewForm }),
        batteriesCleanliness: new FormControl({ value: this.signalMaintanance.metadata.batteriesCleanliness, disabled: this.viewForm }),
        telephoneChord: new FormControl({ value: this.signalMaintanance.metadata.telephoneChord, disabled: this.viewForm }),
        recordBook: new FormGroup({
          handleChangePB: new FormControl({ value: this.signalMaintanance.metadata.recordBook.handleChangePB, disabled: this.viewForm }),
          sealAndLockOfRelay: new FormControl({ value: this.signalMaintanance.metadata.recordBook.sealAndLockOfRelay, disabled: this.viewForm }),
          handleChangeTCFOrTGF: new FormControl({ value: this.signalMaintanance.metadata.recordBook.handleChangeTCFOrTGF, disabled: this.viewForm }),
          forceDrobingNToTGF: new FormControl({ value: this.signalMaintanance.metadata.recordBook.forceDrobingNToTGF, disabled: this.viewForm }),
          lssLineClear: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lssLineClear, disabled: this.viewForm }),
          lssTrackCircuit: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lssTrackCircuit, disabled: this.viewForm }),
          lssLineGear: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lssLineGear, disabled: this.viewForm }),
          hsTrackCircuit: new FormControl({ value: this.signalMaintanance.metadata.recordBook.hsTrackCircuit, disabled: this.viewForm }),
          handleNormalizeWithSM: new FormControl({ value: this.signalMaintanance.metadata.recordBook.handleNormalizeWithSM, disabled: this.viewForm }),
          handleNormalizeWithSMWithBlock: new FormControl({ value: this.signalMaintanance.metadata.recordBook.handleNormalizeWithSMWithBlock, disabled: this.viewForm }),
          cancelWithSM: new FormControl({ value: this.signalMaintanance.metadata.recordBook.cancelWithSM, disabled: this.viewForm }),
          nToPBCancellation: new FormControl({ value: this.signalMaintanance.metadata.recordBook.nToPBCancellation, disabled: this.viewForm }),
          smKeyInstrument: new FormControl({ value: this.signalMaintanance.metadata.recordBook.smKeyInstrument, disabled: this.viewForm }),
          shuntingKeyFunction: new FormControl({ value: this.signalMaintanance.metadata.recordBook.shuntingKeyFunction, disabled: this.viewForm }),
          carrierFrequency: new FormControl({ value: this.signalMaintanance.metadata.recordBook.carrierFrequency, disabled: this.viewForm }),
          buzzerAndIndicator: new FormControl({ value: this.signalMaintanance.metadata.recordBook.buzzerAndIndicator, disabled: this.viewForm }),
          countersMovement: new FormControl({ value: this.signalMaintanance.metadata.recordBook.countersMovement, disabled: this.viewForm }),
          telphoneWorking: new FormControl({ value: this.signalMaintanance.metadata.recordBook.telphoneWorking, disabled: this.viewForm }),
          wirringConnections: new FormControl({ value: this.signalMaintanance.metadata.recordBook.wirringConnections, disabled: this.viewForm }),
          clean_Spring_Segment_Presure: new FormControl({ value: this.signalMaintanance.metadata.recordBook.clean_Spring_Segment_Presure, disabled: this.viewForm }),
          insulatedLead: new FormControl({ value: this.signalMaintanance.metadata.recordBook.insulatedLead, disabled: this.viewForm }),
          referenceMessage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.referenceMessage, disabled: this.viewForm }),
          fullDeflectionIndicator: new FormControl({ value: this.signalMaintanance.metadata.recordBook.fullDeflectionIndicator, disabled: this.viewForm }),
          instrumentDue: new FormControl({ value: this.signalMaintanance.metadata.recordBook.instrumentDue, disabled: this.viewForm }),
          batteryClean: new FormControl({ value: this.signalMaintanance.metadata.recordBook.batteryClean, disabled: this.viewForm }),
          mechanicalPartsCondition: new FormControl({ value: this.signalMaintanance.metadata.recordBook.mechanicalPartsCondition, disabled: this.viewForm }),
          lineClearSignal: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lineClearSignal, disabled: this.viewForm }),
          opposingLastSignal: new FormControl({ value: this.signalMaintanance.metadata.recordBook.opposingLastSignal, disabled: this.viewForm }),
          arrivalTrainSignal: new FormControl({ value: this.signalMaintanance.metadata.recordBook.arrivalTrainSignal, disabled: this.viewForm }),
          pushButtonSelfRestore: new FormControl({ value: this.signalMaintanance.metadata.recordBook.pushButtonSelfRestore, disabled: this.viewForm }),
          blockBellArmature: new FormControl({ value: this.signalMaintanance.metadata.recordBook.blockBellArmature, disabled: this.viewForm }),
          lineCurrent: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lineCurrent, disabled: this.viewForm }),
          lineVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lineVoltage, disabled: this.viewForm }),
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
        window.location.href = '/#/blocks';
        console.log(signals);
      });
  }
}

export class BlockAssetMaintanence {
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

  public metadata: BlockAssetMaintanenceMetadata;

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
    this.metadata = new BlockAssetMaintanenceMetadata(args.metadata || {});
  }

}

export class BlockAssetMaintanenceMetadata {
  public lockAndSeal: boolean;
  public smLock: boolean;
  public needleIndicator: boolean;
  public conditionOfFitting: boolean;
  public batteriesCleanliness: boolean;
  public telephoneChord: boolean;
  public recordBook: BlockRecordBook;

  constructor(args: any) {
    this.lockAndSeal = args.lockAndSeal;
    this.smLock = args.smLock;
    this.needleIndicator = args.needleIndicator;
    this.conditionOfFitting = args.conditionOfFitting;
    this.batteriesCleanliness = args.batteriesCleanliness;
    this.telephoneChord = args.telephoneChord;
    this.recordBook = new BlockRecordBook(args.recordBook || {});
  }
}

export class BlockRecordBook {
  public handleChangePB: boolean;
  public sealAndLockOfRelay: boolean;
  public handleChangeTCFOrTGF: boolean;
  public forceDrobingNToTGF: boolean;
  public lssLineClear: boolean;
  public lssTrackCircuit: boolean;
  public lssLineGear: boolean;
  public hsTrackCircuit: boolean;
  public handleNormalizeWithSM: boolean;
  public handleNormalizeWithSMWithBlock: boolean;
  public cancelWithSM: boolean;
  public nToPBCancellation: boolean;
  public smKeyInstrument: boolean;
  public shuntingKeyFunction: boolean;
  public carrierFrequency: boolean;
  public buzzerAndIndicator: boolean;
  public countersMovement: boolean;
  public telphoneWorking: boolean;
  public wirringConnections: boolean;
  public clean_Spring_Segment_Presure: boolean;
  public insulatedLead: boolean;
  public referenceMessage: boolean;
  public fullDeflectionIndicator: boolean;
  public instrumentDue: boolean;
  public batteryClean: boolean;
  public mechanicalPartsCondition: boolean;
  public lineClearSignal: boolean;
  public opposingLastSignal: boolean;
  public arrivalTrainSignal: boolean;
  public pushButtonSelfRestore: boolean;
  public blockBellArmature: boolean;
  public lineCurrent: string;
  public lineVoltage: string;
  public remarks: string;
  public faulty: boolean;

  constructor(args: any) {
    this.handleChangePB = args.handleChangePB;
    this.sealAndLockOfRelay = args.sealAndLockOfRelay;
    this.handleChangeTCFOrTGF = args.handleChangeTCFOrTGF;
    this.forceDrobingNToTGF = args.forceDrobingNToTGF;
    this.lssLineClear = args.lssLineClear
    this.lssTrackCircuit = args.lssTrackCircuit;
    this.lssLineGear = args.lssLineGear;
    this.hsTrackCircuit = args.hsTrackCircuit;
    this.handleNormalizeWithSM = args.handleNormalizeWithSM;
    this.handleNormalizeWithSMWithBlock = args.handleNormalizeWithSMWithBlock;
    this.cancelWithSM = args.cancelWithSM;
    this.nToPBCancellation = args.nToPBCancellation;
    this.smKeyInstrument = args.smKeyInstrument;
    this.shuntingKeyFunction = args.shuntingKeyFunction;
    this.carrierFrequency = args.carrierFrequency;
    this.buzzerAndIndicator = args.buzzerAndIndicator;
    this.countersMovement = args.countersMovement;
    this.telphoneWorking = args.telphoneWorking;
    this.wirringConnections = args.wirringConnections;
    this.clean_Spring_Segment_Presure = args.clean_Spring_Segment_Presure;
    this.insulatedLead = args.insulatedLead;
    this.referenceMessage = args.referenceMessage;
    this.fullDeflectionIndicator = args.fullDeflectionIndicator;
    this.instrumentDue = args.instrumentDue;
    this.batteryClean = args.batteryClean;
    this.mechanicalPartsCondition = args.mechanicalPartsCondition;
    this.lineClearSignal = args.lineClearSignal;
    this.opposingLastSignal = args.opposingLastSignal;
    this.arrivalTrainSignal = args.arrivalTrainSignal;
    this.pushButtonSelfRestore = args.pushButtonSelfRestore;
    this.blockBellArmature = args.blockBellArmature;
    this.lineCurrent = args.lineCurrent;
    this.lineVoltage = args.lineVoltage;
    this.remarks = args.remarks;
    this.faulty = args.faulty;
  }
}
