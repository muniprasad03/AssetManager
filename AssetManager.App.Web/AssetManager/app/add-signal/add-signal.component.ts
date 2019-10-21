import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignalService } from '../signal-service/signal-service'

@Component({
  selector: 'app-add-signal',
  templateUrl: './add-signal.component.html',
  styleUrls: ['./add-signal.component.css']
})
export class AddSignalComponent implements OnInit {
  public addAssetForm: FormGroup;
  private formBuilder: FormBuilder;

  constructor(private SignalService: SignalService) { }

  ngOnInit() {
    this.SignalService
      .addSignal({})
      .then(signals => {
        console.log(signals);
      });
  }

}
