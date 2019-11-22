import { Component, OnInit } from '@angular/core';
import { AxelMaintanenceService } from '../AxelCounter/axel-maintenance-service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-axel-maintanece-list',
  templateUrl: './axel-maintanece-list.component.html',
  styleUrls: ['./axel-maintanece-list.component.css']
})
export class AxelMaintaneceListComponent implements OnInit {

  public signalId: number;
  signalsArray: any;

  constructor(private SignalMaintanenceService: AxelMaintanenceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
