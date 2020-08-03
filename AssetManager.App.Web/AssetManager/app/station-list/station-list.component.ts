import { Component, OnInit } from '@angular/core';
import { StationService } from '../station-service/station-service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']

})
export class StationListComponent implements OnInit {

  public signalId: number;
  signalsArray: any;

  constructor(private SignalMaintanenceService: StationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      this.signalId = +params['id'];
    });
  }
  ngOnInit() {
  
     this.SignalMaintanenceService.getStations()
     
    }
  
}
