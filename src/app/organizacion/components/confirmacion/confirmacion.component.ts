import { Component, Input, OnInit } from '@angular/core';
import { Trayecto } from 'src/app/domain/models/viajes/Trayecto';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styles: [
  ]
})
export class ConfirmacionComponent implements OnInit {

  @Input() trayecto!: Trayecto;
  constructor() { }

  ngOnInit(): void {
  }

}
