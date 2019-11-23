import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Signal } from '../add-signal/add-signal.component';
import { ActivatedRoute } from '@angular/router';
import { SignalMaintanenceService } from '../signal-service/signal-maintenance-service';

@Component({
  selector: 'app-add-point-maintanece',
  templateUrl: './add-point-maintanece.component.html',
  styleUrls: ['./add-point-maintanece.component.css']
})
export class AddPointMaintaneceComponent implements OnInit {

    public addAssetMaintanenceForm: FormGroup;
    public scannedData: any;
    public assetDetails: any;
    public hasPermission: boolean;
    enableScanner = false;
    public signalId: number;
    public signal: Signal = new Signal({});

    constructor(private SignalService: SignalService,
        private SignalMaintanenceService: SignalMaintanenceService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {
        this.buildAddAssetForm();
        this.route.params.subscribe(params => {
            this.signalId = +params['id'];
        });
    }

    ngOnInit() {
        this.buildAddAssetForm();
        if (this.signalId > 0) {
            this.SignalService.getSignal(this.signalId).then(sig => {
                this.signal = new Signal(sig);
                this.buildAddAssetForm();
            });
        }
    }

    buildAddAssetForm() {
        this.addAssetMaintanenceForm = this.formBuilder.group({
            stationName: new FormControl({ value: this.signal.stationName, disabled: true }),
            pointName: new FormControl(this.signal.name),
            slatitude: new FormControl(this.signal.latitude),
            slongitude: new FormControl(this.signal.longitude),
            latitude: new FormControl(null),
            longitude: new FormControl(null),
            serialNumber: new FormControl(this.signal.metadata.serialNumber),
            make: new FormControl(this.signal.make),
            model: new FormControl(this.signal.model),
            cleanSignal: new FormControl(null),
            metadata: new FormGroup({
                cleanSignal: new FormControl(null),
                smcData: new FormGroup({
                    maintanenceType: new FormControl(null),
                    aspect: new FormControl(null),
                    make: new FormControl(null),
                    model: new FormControl(null),
                    aspectNumber: new FormControl(null),
                    version: new FormControl(null),
                    aspectColor: new FormControl(null),
                    serialNumber: new FormControl(null),
                    dateOfManufacture: new FormControl(null),
                    dataOfInstallation: new FormControl(null),
                    lifeInMonths: new FormControl(null),
                    midLifeRehabilation: new FormControl(null),
                    remarks: new FormControl(null),
                }),
                recordBook: new FormGroup({
                    rgVoltage: new FormControl(null),
                    dgVoltage: new FormControl(null),
                    hgVoltage: new FormControl(null),
                    hhgVoltage: new FormControl(null),
                    cogVoltage: new FormControl(null),
                    amarker: new FormControl(null),
                    agmarker: new FormControl(null),
                    cmarker: new FormControl(null),
                    routeIndicator: new FormControl(null),
                    schedule: new FormControl(null),
                    remarks: new FormControl(null),
                    faulty: new FormControl(null),
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
    public addedOn: Date;
    public latitiude: string;
    public longitude: string;
    public metadata: ColorLightSignalMaintanenceMetadata;

    constructor(args: ColorLightSignalAssetMaintanence) {
        this.id = args.id;
        this.addedBy = args.addedBy;
        this.addedOn = args.addedOn;
        this.latitiude = args.latitiude;
        this.longitude = args.longitude;
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
    public dataOfInstallation: Date;
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
        this.dataOfInstallation = args.dataOfInstallation;
        this.lifeInMonths = args.lifeInMonths;
        this.midLifeRehabilation = args.midLifeRehabilation;
        this.remarks = args.remarks;
    }

}

export class RecordBook {
    public motorMake: string 
    public motorSerialNumber: string; 
    public dateOfManufacture: string; 
    public dateOfInstallation: string;
    public peakLoad: string;
    public normalLoad: string;
    public obstructionLoad: string;
    public voltageObstruction: string;
    public voltageNormal: string;
    public wJRTiming: string;
    public operationFrom: string;
    public operationTo: string;
    public remarks: string;

    constructor(args: RecordBook) {
        this.motorMake = args.motorMake;
        this.motorSerialNumber = args.motorSerialNumber;
        this.dateOfManufacture =  args.dateOfManufacture;
      this.dateOfInstallation = args.dateOfInstallation;
        this.peakLoad = args.dateOfInstallation;
        this.normalLoad = args.normalLoad;
        this.obstructionLoad = args.obstructionLoad;
        this.voltageObstruction = args.voltageObstruction;
        this.voltageNormal = args.voltageNormal;
        this.wJRTiming = args.wJRTiming;
        this.operationFrom = args.operationFrom;
        this.operationTo = args.operationTo;
        this.remarks = args.remarks;
    }

}
