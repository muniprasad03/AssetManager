import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Signal } from '../add-signal/add-signal.component';
import { ActivatedRoute } from '@angular/router';
import { SignalMaintanenceService } from '../signal-service/signal-maintenance-service';

@Component({
  selector: 'app-add-block-maintanece',
  templateUrl: './add-block-maintanece.component.html',
  styleUrls: ['./add-block-maintanece.component.css']
})
export class AddBlockMaintaneceComponent implements OnInit {

    public addAssetMaintanenceForm: FormGroup;
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
                    handleChangePB: new FormControl({ value: this.signalMaintanance.metadata.recordBook.handleChangePB, disabled: this.viewForm }),
                    sealAndLockOfRelay: new FormControl({ value: this.signalMaintanance.metadata.recordBook.sealAndLockOfRelay, disabled: this.viewForm }),
                    handleChangeTCFOrTGF: new FormControl({ value: this.signalMaintanance.metadata.recordBook.handleChangeTCFOrTGF, disabled: this.viewForm }),
                    forceDrobingNToTGF: new FormControl({ value: this.signalMaintanance.metadata.recordBook.forceDrobingNToTGF, disabled: this.viewForm }),
                    lSSLineClear: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lSSLineClear, disabled: this.viewForm }),
                    lSSTrackCircuit: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lSSTrackCircuit, disabled: this.viewForm }),
                    lSSLineGearr: new FormControl({ value: this.signalMaintanance.metadata.recordBook.lSSLineGear, disabled: this.viewForm }),
                    hSTrackCircuit: new FormControl({ value: this.signalMaintanance.metadata.recordBook.hSTrackCircuit, disabled: this.viewForm }),
                    handleNormalizeWithSM: new FormControl({ value: this.signalMaintanance.metadata.recordBook.handleNormalizeWithSM, disabled: this.viewForm }),
                    handleNormalizeWithSMWithBlock: new FormControl({ value: this.signalMaintanance.metadata.recordBook.handleNormalizeWithSMWithBlock, disabled: this.viewForm }),
                    cancelWithSM: new FormControl({ value: this.signalMaintanance.metadata.recordBook.cancelWithSM, disabled: this.viewForm }),
                    nToPBCancellation: new FormControl({ value: this.signalMaintanance.metadata.recordBook.nToPBCancellation, disabled: this.viewForm }),
                    sMKeyInstrument: new FormControl({ value: this.signalMaintanance.metadata.recordBook.sMKeyInstrument, disabled: this.viewForm }),
                    shuntingKeyFunction: new FormControl({ value: this.signalMaintanance.metadata.recordBook.shuntingKeyFunction, disabled: this.viewForm }),
                    carrierFrequency: new FormControl({ value: this.signalMaintanance.metadata.recordBook.carrierFrequency, disabled: this.viewForm }),
                    buzzerAndIndicator: new FormControl({ value: this.signalMaintanance.metadata.recordBook.buzzerAndIndicator, disabled: this.viewForm }),
                    countersMovement: new FormControl({ value: this.signalMaintanance.metadata.recordBook.countersMovement, disabled: this.viewForm }),
                    telphoneWorking: new FormControl({ value: this.signalMaintanance.metadata.recordBook.telphoneWorking, disabled: this.viewForm }),
                    wirringConnectionst: new FormControl({ value: this.signalMaintanance.metadata.recordBook.wirringConnections, disabled: this.viewForm }),
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
                window.location.href = '/#/signals';
                console.log(signals);
            });
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
    public handleChangePB: boolean ;
    public sealAndLockOfRelay: boolean ;
    public handleChangeTCFOrTGF: boolean ; 
    public forceDrobingNToTGF: boolean ;
    public lSSLineClear: boolean ;
    public lSSTrackCircuit: boolean ;
    public lSSLineGear: boolean ;
    public hSTrackCircuit: boolean ;
    public handleNormalizeWithSM: boolean ;
    public handleNormalizeWithSMWithBlock: boolean ;
    public cancelWithSM: boolean ;
    public nToPBCancellation: boolean ; 
    public sMKeyInstrument: boolean ;
    public shuntingKeyFunction: boolean ;
    public carrierFrequency: boolean ; 
    public buzzerAndIndicator: boolean ;
    public countersMovement: boolean ;
    public telphoneWorking: boolean ;
    public wirringConnections: boolean ;
    public clean_Spring_Segment_Presure: boolean ;
    public insulatedLead: boolean ;
    public referenceMessage: boolean;
    public fullDeflectionIndicator: boolean;
    public instrumentDue : boolean;
    public batteryClean : boolean;
    public mechanicalPartsCondition : boolean;
    public lineClearSignal : boolean;
    public opposingLastSignal : boolean;
    public arrivalTrainSignal : boolean;
    public pushButtonSelfRestore : boolean;
    public blockBellArmature : boolean;
    public lineCurrent: string;
    public lineVoltage: string;
    public remarks: string;
    public faulty : boolean;

    constructor(args: RecordBook) {
    this.handleChangePB = args.handleChangePB;
    this.sealAndLockOfRelay = args.sealAndLockOfRelay;
    this.handleChangeTCFOrTGF = args.handleChangeTCFOrTGF;
    this.forceDrobingNToTGF = args.forceDrobingNToTGF;
    this.lSSLineClear = args.lSSLineClear
    this.lSSTrackCircuit = args.lSSTrackCircuit;
    this.lSSLineGear = args.lSSLineGear;
    this.hSTrackCircuit= args.hSTrackCircuit;
    this.handleNormalizeWithSM= args.handleNormalizeWithSM;
    this.handleNormalizeWithSMWithBlock= args.handleNormalizeWithSMWithBlock;
    this.cancelWithSM= args.cancelWithSM;
    this.nToPBCancellation= args.nToPBCancellation;
    this.sMKeyInstrument= args.sMKeyInstrument;
    this.shuntingKeyFunction= args.shuntingKeyFunction;
    this.carrierFrequency= args.carrierFrequency;
    this.buzzerAndIndicator= args.buzzerAndIndicator;
    this.countersMovement= args.countersMovement;
    this.telphoneWorking= args.telphoneWorking;
    this.wirringConnections= args.wirringConnections;
    this.clean_Spring_Segment_Presure= args.clean_Spring_Segment_Presure;
    this.insulatedLead= args.insulatedLead;
    this.referenceMessage= args.referenceMessage;
    this.fullDeflectionIndicator= args.fullDeflectionIndicator;
    this.instrumentDue= args.instrumentDue;
    this.batteryClean= args.batteryClean;
    this.mechanicalPartsCondition= args.mechanicalPartsCondition;
    this.lineClearSignal= args.lineClearSignal;
    this.opposingLastSignal= args.opposingLastSignal;
    this.arrivalTrainSignal= args.arrivalTrainSignal;
    this.pushButtonSelfRestore= args.pushButtonSelfRestore;
    this.blockBellArmature= args.blockBellArmature;
    this.lineCurrent= args.lineCurrent;
    this.lineVoltage = args.lineVoltage;
    this.remarks = args.remarks;
    this.faulty= args.faulty;
    }

}
