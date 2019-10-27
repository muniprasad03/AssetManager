import { Component, OnInit } from '@angular/core';
import { TrackService } from '../track-service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {

    signalsArray: any;
    constructor(private SignalService: TrackService) { }

    ngOnInit() {
        this.SignalService
            .getSignals()
            .then(signals => {
                this.signalsArray = signals;
                console.log(signals);
            });
    }

}
