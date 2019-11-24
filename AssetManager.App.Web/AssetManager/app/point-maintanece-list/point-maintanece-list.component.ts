import { Component, OnInit } from '@angular/core';
import { PointMaintanenceService } from '../Point/point-maintenance-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-point-maintanece-list',
  templateUrl: './point-maintanece-list.component.html',
  styleUrls: ['./point-maintanece-list.component.css']
})
export class PointMaintaneceListComponent implements OnInit {

  public signalId: number;
  signalsArray: any;

  constructor(private SignalMaintanenceService: PointMaintanenceService,
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
