import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campo-requerido',
  templateUrl: './campo-requerido.component.html',
  styles: [
  ]
})
export class CampoRequeridoComponent implements OnInit {

  @Input() message: string = 'El campo es requerido';

  constructor() { }

  ngOnInit(): void {
  }

}
