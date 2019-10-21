import { Component, OnInit } from '@angular/core';
import { SignalService } from '../signal-service/signal-service'

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})
export class SignalComponent implements OnInit {

  constructor(private SignalService: SignalService) { }

  ngOnInit() {
    this.SignalService
      .getSignals()
      .then(signals => {
        console.log(signals);
      });
  }
}
