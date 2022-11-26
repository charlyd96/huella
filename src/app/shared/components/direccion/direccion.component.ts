import { Component, Input, OnInit } from '@angular/core';
import { Localidad } from 'src/app/domain/models/ubicacion/Localidad';
import { Municipio } from 'src/app/domain/models/ubicacion/Municipio';
import { Provincia } from 'src/app/domain/models/ubicacion/Provincia';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalizacionService } from '../../../services/localizacion-service.service';
import { Direccion } from 'src/app/domain/models/ubicacion/Direccion';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styles: [
  ]
})
export class DireccionComponent implements OnInit {

  @Input() titulo: string = '';
  formDireccion = this.formBuilder.group({
    calle: ['', Validators.required],
    numero: ['', Validators.required],
    codigoPostal: ['', Validators.required],
    localidad: ['', Validators.required],
    municipio: ['', Validators.required],
    provincia: ['', Validators.required],
  });

  localidades: Localidad[] = []

  municipios: Municipio [] = []

  constructor(private formBuilder: FormBuilder,
    private localizacionService: LocalizacionService) { }

  async ngOnInit() {

  }

  async setMunicipio() {
    let provinciaId = await this.formDireccion.controls.provincia.value.id;
    this.municipios = await this.localizacionService.getMunicipios(provinciaId);
  }

  async setLocalidad() {
    let municipioId = await this.formDireccion.controls.municipio.value.id;
    this.localidades = await this.localizacionService.getLocalidades(municipioId);
  }

  provincias() {
    return this.localizacionService.getProvincias
  }

  campoInvalido(campo: string) {
    return this.formDireccion.controls[campo].invalid && this.formDireccion.controls[campo].touched;
  }

  // Devuelve la entidad Direccion si todos sus campos son válidos. Invocar desde el componente que utilice a
  // el componente DireccionComponent
  getData(): Direccion | null {
    if (this.formDireccion.invalid) {
      this.formDireccion.markAllAsTouched();
      return null;
    }
    return <Direccion> this.formDireccion.value;
  }
}
