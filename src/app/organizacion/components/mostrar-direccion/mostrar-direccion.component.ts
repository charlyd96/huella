import { Component, Input, OnInit } from '@angular/core';
import { Direccion } from 'src/app/domain/models/ubicacion/Direccion';

@Component({
  selector: 'app-mostrar-direccion',
  templateUrl: './mostrar-direccion.component.html',
  styleUrls: ['./mostrar-direccion.component.css']
})
export class MostrarDireccionComponent implements OnInit {

  @Input() direccion!: Direccion;
  @Input() titulo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
