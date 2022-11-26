import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent implements OnInit {

  @Input() title!: string;
  @Input() messages!: string[];
  @Input() displayCancel!: boolean;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
