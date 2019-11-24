import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TrackCircuitAsset } from '../Track Circuits/add-track/add-track.component';
import { ActivatedRoute } from '@angular/router';
import { TrackMaintanenceService } from '../Track Circuits/track-service-maintenace';
import { TrackService } from '../Track Circuits/track-service';

@Component({
  selector: 'app-add-track-circuit-maintanece',
  templateUrl: './add-track-circuit-maintanece.component.html',
  styleUrls: ['./add-track-circuit-maintanece.component.css']
})
export class AddTrackCircuitMaintaneceComponent implements OnInit {

    public addAssetMaintanenceForm: FormGroup;
    public signalId: number;
    public signal: TrackCircuitAsset = new TrackCircuitAsset({});
    public maintananceId: number;
    public viewForm: boolean;
    public signalMaintanance: TrackAssetMaintanence = new TrackAssetMaintanence({});

    constructor(private SignalService: TrackService ,
        private SignalMaintanenceService:TrackMaintanenceService,
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
                this.signal = new TrackCircuitAsset(sig);
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
            date: new FormControl({ value: this.signalMaintanance.addedOn, disabled: true }),
            time: new FormControl({ value: this.signalMaintanance.time, disabled: true }),
            gearName: new FormControl({ value: this.signalMaintanance.name, disabled: true }),
            assetId: new FormControl({ value: this.signalMaintanance.assetId, disabled: true }),
            slatitude: new FormControl({ value: this.signalMaintanance.assetLatitude, disabled: true }),
            slongitude: new FormControl({ value: this.signalMaintanance.assetLongitude, disabled: true }),
            latitude: new FormControl({ value: this.signalMaintanance.latitiude, disabled: this.viewForm }),
            longitude: new FormControl({ value: this.signalMaintanance.longitude, disabled: this.viewForm }),
            serialNumber: new FormControl({ value: this.signal.metadata.serialNumber, disabled: true }),
            make: new FormControl({ value: this.signal.make, disabled: true }),
            model: new FormControl({ value: this.signal.model, disabled: true }),
            metadata: new FormGroup({
                smc9lh: new FormGroup({
                    typeOfRelay: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.typeOfRelay, disabled: this.viewForm }),
                    dateOfInstallation: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.dateOfInstallation, disabled: this.viewForm }),
                    pUVolt: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.pUVolt, disabled: this.viewForm }),
                    dAVolts: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.dAVolts, disabled: this.viewForm }),
                    pUCurrent: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.pUCurrent, disabled: this.viewForm }),
                    dACurrent: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.dACurrent, disabled: this.viewForm }),
                    trackLength: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.trackLength, disabled: this.viewForm }),
                    feedToTrackLength: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.feedToTrackLength, disabled: this.viewForm }),
                    relayToTrackLength: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.relayToTrackLength, disabled: this.viewForm }),
                    typeOfBallast: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.typeOfBallast, disabled: this.viewForm }),
                    typeOfTrackFeed: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.typeOfTrackFeed, disabled: this.viewForm }),
                    trackFeedSize: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.trackFeedSize, disabled: this.viewForm }),
                    conductorToRelayLength: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.conductorToRelayLength, disabled: this.viewForm }),
                    typeOfSleeper: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.typeOfSleeper, disabled: this.viewForm }),
                    typeOfInsulatedJoints: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.typeOfInsulatedJoints, disabled: this.viewForm }),
                    noOfBridgesInTrack: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.noOfBridgesInTrack, disabled: this.viewForm }),
                    noOfLevelCrossInTrack: new FormControl({ value: this.signalMaintanance.metadata.smc9lh.noOfLevelCrossInTrack, disabled: this.viewForm }),

                }),
                smc9rh: new FormGroup({
                    weather: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.weather, disabled: this.viewForm }),
                    ballastCondition: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.ballastCondition, disabled: this.viewForm }),
                    percentageOfBallast: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.percentageOfBallast, disabled: this.viewForm }),
                    drainingTrack: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.drainingTrack, disabled: this.viewForm }),
                    conditionOfRail: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.conditionOfRail, disabled: this.viewForm }),
                    conditionOfBonds: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.conditionOfBonds, disabled: this.viewForm }),
                    conditionOfInsulatedJoint: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.conditionOfInsulatedJoint, disabled: this.viewForm }),
                    feedResistance: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.feedResistance, disabled: this.viewForm }),
                    trackFeedVoltage: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.trackFeedVoltage, disabled: this.viewForm }),
                    vFVoltage: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.vFVoltage, disabled: this.viewForm }),
                    iFCurrentOnRails: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.iFCurrentOnRails, disabled: this.viewForm }),
                    voltageAtRelayTerminals: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.voltageAtRelayTerminals, disabled: this.viewForm }),
                    iRCurrentAtRelay: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.iRCurrentAtRelay, disabled: this.viewForm }),
                    ballastResistance: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.ballastResistance, disabled: this.viewForm }),
                    railResistance: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.railResistance, disabled: this.viewForm }),
                    dropShuntValue: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.dropShuntValue, disabled: this.viewForm }),
                    pickUpShuntValue: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.pickUpShuntValue, disabled: this.viewForm }),
                    phaseAngle: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.phaseAngle, disabled: this.viewForm }),
                    noOfFailures: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.noOfFailures, disabled: this.viewForm }),
                    causeOfFailure: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.causeOfFailure, disabled: this.viewForm }),
                    remarks: new FormControl({ value: this.signalMaintanance.metadata.smc9rh.remarks, disabled: this.viewForm }),
                }),
                smc10: new FormGroup({
                    jointType: new FormControl({ value: this.signalMaintanance.metadata.smc10.jointType, disabled: this.viewForm }),
                    endPost: new FormControl({ value: this.signalMaintanance.metadata.smc10.endPost, disabled: this.viewForm }),
                    channelPlate1: new FormControl({ value: this.signalMaintanance.metadata.smc10.channelPlate1, disabled: this.viewForm }),
                    channelPlate2: new FormControl({ value: this.signalMaintanance.metadata.smc10.channelPlate2, disabled: this.viewForm }),
                    channelPlate3: new FormControl({ value: this.signalMaintanance.metadata.smc10.channelPlate3, disabled: this.viewForm }),
                    channelPlate4: new FormControl({ value: this.signalMaintanance.metadata.smc10.channelPlate4, disabled: this.viewForm }),
                    collet1: new FormControl({ value: this.signalMaintanance.metadata.smc10.collet1, disabled: this.viewForm }),
                    collet2: new FormControl({ value: this.signalMaintanance.metadata.smc10.collet2, disabled: this.viewForm }),
                    collet3: new FormControl({ value: this.signalMaintanance.metadata.smc10.collet3, disabled: this.viewForm }),
                    collet4: new FormControl({ value: this.signalMaintanance.metadata.smc10.collet4, disabled: this.viewForm }),
                    collet5: new FormControl({ value: this.signalMaintanance.metadata.smc10.collet5, disabled: this.viewForm }),
                    collet6: new FormControl({ value: this.signalMaintanance.metadata.smc10.collet6, disabled: this.viewForm }),
                    collet7: new FormControl({ value: this.signalMaintanance.metadata.smc10.collet7, disabled: this.viewForm }),
                    collet8: new FormControl({ value: this.signalMaintanance.metadata.smc10.collet8, disabled: this.viewForm }),
                    isFailed: new FormControl({ value: this.signalMaintanance.metadata.smc10.isFailed, disabled: this.viewForm }),
                    remarks: new FormControl({ value: this.signalMaintanance.metadata.smc10.remarks, disabled: this.viewForm }),
                }),
                recordBook: new FormGroup({
                    batteryVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.batteryVoltage, disabled: this.viewForm }),
                    specificGravity: new FormControl({ value: this.signalMaintanance.metadata.recordBook.specificGravity, disabled: this.viewForm }),
                    chargerOffLoad: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chargerOffLoad, disabled: this.viewForm }),
                    chargerOnLoad: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chargerOnLoad, disabled: this.viewForm }),
                    chargerCurrent: new FormControl({ value: this.signalMaintanance.metadata.recordBook.chargerCurrent, disabled: this.viewForm }),
                    dropAcrossChock: new FormControl({ value: this.signalMaintanance.metadata.recordBook.dropAcrossChock, disabled: this.viewForm }),
                    dropAcrossResistance: new FormControl({ value: this.signalMaintanance.metadata.recordBook.dropAcrossResistance, disabled: this.viewForm }),
                    feedEndVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.feedEndVoltage, disabled: this.viewForm }),
                    feedEndCurrent: new FormControl({ value: this.signalMaintanance.metadata.recordBook.feedEndCurrent, disabled: this.viewForm }),
                    relayEndVoltage: new FormControl({ value: this.signalMaintanance.metadata.recordBook.relayEndVoltage, disabled: this.viewForm }),
                    relayEndCurrent: new FormControl({ value: this.signalMaintanance.metadata.recordBook.relayEndCurrent, disabled: this.viewForm }),
                    scheduleDone: new FormControl({ value: this.signalMaintanance.metadata.recordBook.scheduleDone, disabled: this.viewForm }),
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
                window.location.href = '/#/tracks';
                console.log(signals);
            });
    }
}

export class TrackAssetMaintanence {
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
    public time: string;

    public metadata: TrackAssetMaintanenceMetadata;

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
        this.metadata = new TrackAssetMaintanenceMetadata(args.metadata || {});
    }

}

export class TrackAssetMaintanenceMetadata {
    public smc9lh: SMC9LH;
    public smc9rh: SMC9RH;
    public smc10: SMC10 ;
    public recordBook: RecordBook;

    constructor(args) {
        this.smc9lh = new SMC9LH(args.smc9lh || {});
        this.smc9rh = new SMC9RH(args.smc9rh || {});
        this.smc10 = new SMC10(args.smc10 || {});
        this.recordBook = new RecordBook(args.recordBook || {});

    }
}

export class SMC9LH {
        public  typeOfRelay: string ;
        public  dateOfInstallation: string ;
        public  pUVolt: string ;
        public  dAVolts: string ;
        public  pUCurrent: string ;
        public  dACurrent: string ;
        public  relayResistance: string ;
        public  trackLength: string ;
        public  feedToTrackLength: string ;
        public  relayToTrackLength: string ;
        public  typeOfBallast: string ;
        public  typeOfTrackFeed: string ;
        public  trackFeedSize: string ;
        public  conductorToRelayLength: string ;
        public  typeOfSleeper: string ;
        public  typeOfInsulatedJoints: string ;
        public  noOfBridgesInTrack: string ;
        public  noOfLevelCrossInTrack: string ;

    constructor(args: SMC9LH) {
        this.typeOfRelay = args.typeOfRelay;
        this.dateOfInstallation = args.dateOfInstallation;
        this.pUVolt = args.pUVolt;
        this.dAVolts = args.dAVolts;
        this.pUCurrent = args.pUCurrent;
        this.dACurrent = args.dACurrent;
        this.relayResistance = args.relayResistance;
        this.trackLength = args.trackLength;
        this.feedToTrackLength = args.feedToTrackLength;
        this.relayToTrackLength = args.relayToTrackLength;
        this.typeOfBallast = args.typeOfBallast;
        this.typeOfTrackFeed = args.typeOfTrackFeed;
        this.trackFeedSize = args.trackFeedSize;
        this.conductorToRelayLength = args.conductorToRelayLength;
        this.typeOfSleeper = args.typeOfSleeper;
        this.typeOfInsulatedJoints = args.typeOfInsulatedJoints;
        this.noOfBridgesInTrack = args.noOfBridgesInTrack;
        this.noOfLevelCrossInTrack = args.noOfLevelCrossInTrack;

    }

}


export class SMC9RH {
        public weather: string;
        public ballastCondition: string;
        public percentageOfBallast: string;
        public drainingTrack: string;
        public conditionOfRail: string;
        public conditionOfBonds: string;
        public conditionOfInsulatedJoint: string;
        public conditionOfTrackBattery: string;
        public feedResistance: string;
        public trackFeedVoltage: string;
        public vFVoltage: string;
        public iFCurrentOnRails: string;
        public vRVoltageOnRails: string;
        public voltageAtRelayTerminals: string;
        public iRCurrentAtRelay: string;
        public ballastResistance: string;
        public railResistance: string;
        public dropShuntValue: string;
        public pickUpShuntValue: string;
        public phaseAngle: string;
        public noOfFailures: string;
        public causeOfFailure: string;
        public remarks: string;

    constructor(args: SMC9RH) {
        this.weather = args.weather;
        this.ballastCondition = args.ballastCondition;
        this.percentageOfBallast = args.percentageOfBallast;
        this.drainingTrack = args.drainingTrack;
        this.conditionOfRail = args.conditionOfRail;
        this.conditionOfBonds = args.conditionOfBonds;
        this.conditionOfInsulatedJoint = args.conditionOfInsulatedJoint;
        this.conditionOfTrackBattery = args.conditionOfTrackBattery;
        this.feedResistance = args.feedResistance;
        this.trackFeedVoltage = args.trackFeedVoltage;
        this.vFVoltage = args.vFVoltage;
        this.iFCurrentOnRails = args.iFCurrentOnRails;
        this.vRVoltageOnRails = args.vRVoltageOnRails;
        this.voltageAtRelayTerminals = args.voltageAtRelayTerminals;
        this.iRCurrentAtRelay = args.iRCurrentAtRelay;
        this.ballastResistance = args.ballastResistance;
        this.railResistance = args.railResistance;
        this.dropShuntValue = args.dropShuntValue;
        this.pickUpShuntValue = args.pickUpShuntValue;
        this.phaseAngle = args.phaseAngle;
        this.noOfFailures = args.noOfFailures;
        this.causeOfFailure = args.causeOfFailure;
        this.remarks = args.remarks;

    }

}

export class SMC10 {
        public  jointType : string ;
        public  endPost : string ;
        public  channelPlate1 : string ;
        public  channelPlate2 : string ;
        public  channelPlate3 : string ;
        public  channelPlate4 : string ;
        public  collet1 : string ;
        public  collet2 : string ;
        public  collet3 : string ;
        public  collet4 : string ;
        public  collet5 : string ;
        public  collet6 : string ;
        public  collet7 : string ;
        public  collet8 : string ;
        public  isFailed : boolean ;
        public  remarks : string ;

    constructor(args: SMC10) {
        this.jointType = args.jointType;
        this.endPost = args.endPost ; 
        this.channelPlate1 = args.channelPlate1 ;
        this.channelPlate2 = args.channelPlate2 ;
        this.channelPlate3 = args.channelPlate3 ;
        this.channelPlate4 = args.channelPlate4 ;
        this.collet1 = args.collet1 ;
        this.collet2 = args.collet2 ;
        this.collet3 = args.collet3 ;
        this.collet4 = args.collet4 ;
        this.collet5 = args.collet5 ;
        this.collet6 = args.collet6 ;
        this.collet7 = args.collet7 ;
        this.collet8 = args.collet8 ;
        this.isFailed = args.isFailed ;
        this.remarks = args.remarks ;

    }

}

export class RecordBook {
        public batteryVoltage : string ;
        public specificGravity : string ;
        public chargerOffLoad : string ;
        public chargerOnLoad : string ;
        public chargerCurrent : string ;
        public dropAcrossChock : string ;
        public dropAcrossResistance : string ;
        public feedEndVoltage : string ;
        public feedEndCurrent : string ;
        public relayEndVoltage : string ;
        public relayEndCurrent : string ;
        public scheduleDone : string ;
        public remarks : string ;
        public faulty : boolean ;

    constructor(args: RecordBook) {
        this.batteryVoltage = args.batteryVoltage;
        this.specificGravity = args.specificGravity;
        this.chargerOffLoad = args.chargerOffLoad;
        this.chargerOnLoad = args.chargerOnLoad;
        this.chargerCurrent = args.chargerCurrent;
        this.dropAcrossChock= args.dropAcrossChock
        this.dropAcrossResistance = args.dropAcrossResistance;
        this.feedEndVoltage = args.feedEndVoltage;
        this.feedEndCurrent = args.feedEndCurrent;
        this.relayEndVoltage = args.relayEndVoltage;
        this.relayEndCurrent = args.relayEndCurrent;
        this.scheduleDone = args.scheduleDone;
        this.remarks = args.remarks;
        this.faulty = args.faulty;
    }

}
