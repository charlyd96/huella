import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trayecto } from 'src/app/domain/models/viajes/Trayecto';
import { Direccion } from '../../../domain/models/ubicacion/Direccion';
import { DireccionComponent } from '../../../shared/components/direccion/direccion.component';

@Component({
  selector: 'app-ingresar-trayecto',
  templateUrl: './ingresar-trayecto.component.html',
  styles: [
  ]
})
export class IngresarTrayectoComponent implements OnInit {

  @ViewChild('direccionInicial') direccionInicial!: DireccionComponent;
  @ViewChild('direccionFinal') direccionFinal!: DireccionComponent;

  formTrayecto = this.formBuilder.group({
    nombre: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  getData(): Trayecto {
    return <Trayecto>{
      nombre: this.formTrayecto.controls.nombre.value,
      direccionInicio: this.direccionInicial.getData(),
      direccionFin: this.direccionFinal.getData(),
    }
  }

}
