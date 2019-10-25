import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AxelService } from '../axel-service'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-axel',
  templateUrl: './add-axel.component.html',
  styleUrls: ['./add-axel.component.css']
})
export class AddAxelComponent implements OnInit {

    public addAssetForm: FormGroup;
    public scannedData: any;
    public hasPermission: boolean;
    enableScanner = false;
    constructor(private SignalService: AxelService,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.buildAddAssetForm();
    }


    buildAddAssetForm() {
        this.addAssetForm = this.formBuilder.group({
            station: new FormControl({ value: "TUNI", disabled: true }),
            zone: new FormControl({ value: "South Central Railway", disabled: true }),
            division: new FormControl({ value: "Vijayawada", disabled: true }),
            department: new FormControl({ value: "Signal", disabled: true }),
            signalType: new FormControl(null),
            subsidiaryType: new FormControl(null),
            typeOfUnit: new FormControl(null),
            signalName: new FormControl(null),
            serialNumber: new FormControl(null),
            milegeInKM: new FormControl(null),
            implantation: new FormControl(null),
            sacrificialMast: new FormControl(null),
            codalLife: new FormControl(null),
            remarks: new FormControl(null),
            dateOfManufacture: new FormControl(null),
            dateOfInstallation: new FormControl(null),
            make: new FormControl(null),
            model: new FormControl(null),
            signalBaseInstallation: new FormControl(null),
            signalPostInstallation: new FormControl(null),
            latitude: new FormControl(null),
            longitude: new FormControl(null),
        });
    }

    saveAsset(): void {
        const modelCopy = this.addAssetForm.value;
        const metadata = {
            signalType: this.addAssetForm.value["signalType"],
            subsidiaryType: this.addAssetForm.value["subsidiaryType"],
            typeOfUnit: this.addAssetForm.value["typeOfUnit"],
            signalName: this.addAssetForm.value["signalName"],
            serialNumber: this.addAssetForm.value["serialNumber"],
            milegeInKM: this.addAssetForm.value["milegeInKM"],
            implantation: this.addAssetForm.value["implantation"],
            sacrificialMast: this.addAssetForm.value["sacrificialMast"],
            codalLife: this.addAssetForm.value["codalLife"],
            remarks: this.addAssetForm.value["remarks"]
        };

        modelCopy["metaData"] = metadata;
        this.SignalService
            .addSignal(modelCopy)
            .then(signals => {
                window.location.href = '/#/signals';
                console.log(signals);
            });
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
