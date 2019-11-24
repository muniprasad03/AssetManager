import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackMaintanenceService } from '../Track Circuits/track-maintenance-service';

@Component({
  selector: 'app-track-circuit-maintanece-list',
  templateUrl: './track-circuit-maintanece-list.component.html',
  styleUrls: ['./track-circuit-maintanece-list.component.css']
})
export class TrackCircuitMaintaneceListComponent implements OnInit {

  public signalId: number;
  signalsArray: any;

  constructor(private SignalMaintanenceService: TrackMaintanenceService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.signalId = +params['id'];
    });
  }
  ngOnInit() {
    if (this.signalId > 0) {
      this.SignalMaintanenceService.getSignals(this.signalId).then(signals => {
        this.signalsArray = signals;
      });
    }
  }

}
