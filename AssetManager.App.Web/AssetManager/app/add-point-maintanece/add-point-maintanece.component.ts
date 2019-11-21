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
            signalName: new FormControl(this.signal.name),
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
    public nr_motormake: string;
    public nr_serialnumber: string;
    public nr_manufracturingdate: string;
    public nr_motorinstallationdate: string;
    public nr_peakload: string;
    public nr_normalload: string;
    public nr_obstructionload: string;
    public nr_voltagenormal: string;
    public nr_voltageobstruction: string;
    public nr_wjr: string;
    public nr_opertaionpoint_from: string;
    public nr_opertaionpoint_to: string;
    public nr_Remarks: string;
    public motormake: string;
    public serialnumber: string;
    public manufracturingdate: string;
    public motorinstallationdate: string;
    public peakload: string;
    public normalload: string;
    public obstructionload: string;
    public voltagenormal: string;
    public voltageobstruction: string;
    public wjr: string;
    public opertaionpoint_from: string;
    public opertaionpoint_to: string;
    public remarks: string;

    constructor(args: RecordBook) {
        this.nr_motormake = args.nr_motormake;
        this.nr_serialnumber = args.nr_serialnumber;
        this.nr_manufracturingdate = args.nr_manufracturingdate;
        this.nr_motorinstallationdate = args.nr_motorinstallationdate;
        this.nr_peakload = args.nr_peakload;
        this.nr_normalload = args.nr_normalload;
        this.nr_obstructionload = args.nr_obstructionload;
        this.nr_voltagenormal = args.nr_voltagenormal;
        this.nr_voltageobstruction = args.nr_voltageobstruction;
        this.nr_wjr = args.nr_wjr;
        this.nr_opertaionpoint_from = args.nr_opertaionpoint_from;
        this.nr_opertaionpoint_to = args.nr_opertaionpoint_to;
        this.nr_Remarks = args.nr_Remarks;
        this.motormake = args.motormake;
        this.serialnumber = args.serialnumber;
        this.manufracturingdate = args.manufracturingdate;
        this.motorinstallationdate = args.motorinstallationdate;
        this.peakload = args.peakload;
        this.normalload = args.normalload;
        this.obstructionload = args.obstructionload;
        this.voltagenormal = args.voltagenormal;
        this.voltageobstruction = args.voltageobstruction;
        this.wjr = args.wjr;
        this.opertaionpoint_from = args.opertaionpoint_from;
        this.opertaionpoint_to = args.opertaionpoint_to;
        this.remarks = args.remarks;
    }

}
