import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockMaintanenceService } from '../Block/block-maintenance-service';

@Component({
  selector: 'app-block-maintanece-list',
  templateUrl: './block-maintanece-list.component.html',
  styleUrls: ['./block-maintanece-list.component.css']
})
export class BlockMaintaneceListComponent implements OnInit {

  public signalId: number;
  signalsArray: any;

  constructor(private SignalMaintanenceService: BlockMaintanenceService,
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
