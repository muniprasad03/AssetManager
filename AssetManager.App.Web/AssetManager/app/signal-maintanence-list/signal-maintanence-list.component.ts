import { Component, OnInit } from '@angular/core';
import { SignalMaintanenceService } from '../signal-service/signal-maintenance-service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signal-maintanence-list',
  templateUrl: './signal-maintanence-list.component.html',
  styleUrls: ['./signal-maintanence-list.component.css']
})
export class SignalMaintanenceListComponent implements OnInit {

  public signalId: number;
  signalsArray: any;

  constructor(private SignalMaintanenceService: SignalMaintanenceService,
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
