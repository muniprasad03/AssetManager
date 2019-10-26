import { Component, OnInit } from '@angular/core';
import { SignalService} from '../../signal-service/signal-service';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css']
})
export class PointListComponent implements OnInit {

    signalsArray: any;
    constructor(private SignalService: SignalService ) { }

    ngOnInit() {
        this.SignalService
            .getSignals()
            .then(signals => {
                this.signalsArray = signals;
                console.log(signals);
            });
    }

}
