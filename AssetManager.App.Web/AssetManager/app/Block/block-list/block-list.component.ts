import { Component, OnInit } from '@angular/core';
import { BlockService } from '../block-service';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit {

    signalsArray: any;
    constructor(private SignalService: BlockService) { }

    ngOnInit() {
        this.SignalService
            .getSignals()
            .then(signals => {
                this.signalsArray = signals;
                console.log(signals);
            });
    }

}
