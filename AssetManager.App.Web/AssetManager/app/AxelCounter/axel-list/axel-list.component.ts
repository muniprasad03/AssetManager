import { Component, OnInit } from '@angular/core';
import { AxelService } from '../axel-service'

@Component({
  selector: 'app-axel-list',
  templateUrl: './axel-list.component.html',
  styleUrls: ['./axel-list.component.css']
})
export class AxelListComponent implements OnInit {

    signalsArray: any;
    constructor(private SignalService: AxelService) { }

    ngOnInit() {
        this.SignalService
            .getSignals()
            .then(signals => {
                this.signalsArray = signals;
                console.log(signals);
            });
    }

}
