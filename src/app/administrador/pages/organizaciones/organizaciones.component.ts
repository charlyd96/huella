
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ClasificacionesService } from '../../../services/clasificaciones.service';
import { Clasificacion } from '../../../domain/models/Clasificacion';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CrearOrganizacion} from '../../../domain/models/CrearOrganizacion';
import { OrganizacionService } from '../../../services/organizacion.service';
import { DireccionComponent } from '../../../shared/components/direccion/direccion.component';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styles: [
  ]
})

export class OrganizacionesComponent implements OnInit {

  @ViewChild('direccion') direccion!: DireccionComponent;

  formulario: FormGroup = this.fb.group({
    nombre:['',Validators.required],
    razonSocial:['',Validators.required],
    tipoOrganizacion:['',Validators.required],
    clasificacion:['',Validators.required],
    email:['',Validators.required],
    numeroDeTelefono:['',Validators.required],
    sectores: this.fb.array([])
  })
  nuevoSector: FormControl = this.fb.control('', Validators.required)

  clasificaciones: Clasificacion[] = [];
  organizaciones: CrearOrganizacion[] = [];

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private clasificacionService: ClasificacionesService,
    private organizacionService: OrganizacionService,
    private router: Router,
    private alertService: AlertService) { }

  async ngOnInit() {
    if (!this.auth.esSoloUsuarioRegistrado()) {
      this.router.navigateByUrl('/home');
    }
    this.clasificacionService.getClasificaciones()
    .then((listadoClasificacionesResponse) => {
      this.clasificaciones = listadoClasificacionesResponse;
    })
    .catch((err) => {
      this.alertService.displayErrorAlert(['Error al cargar las clasificaciones', err.error.message]);
    })
  }

  get tiposOrganizaciones() {
    return this.auth.systemEnums?.tipoOrg;
  }

  public crear() {
    if (this.formulario.invalid || this.direccion.formDireccion.invalid) {
      this.direccion.formDireccion.markAllAsTouched();
      return;
    }

    let crearOrganizacionModel: CrearOrganizacion = <CrearOrganizacion> {
      nombre: this.formulario.get('nombre')?.value,
      razonSocial: this.formulario.get('razonSocial')?.value,
      tipoOrganizacion: this.formulario.get('tipoOrganizacion')?.value,
      clasificacion: this.formulario.get('clasificacion')?.value,
      email: this.formulario.get('email')?.value,
      numeroDeTelefono:this.formulario.get('numeroDeTelefono')?.value,
      direccion: this.direccion.getData(),
      sectores: this.sectoresArray.value
    };

    this.organizacionService.crearOrganizacion(crearOrganizacionModel)
      .then(()=> {
        this.alertService.displayAlert('Aviso', ['La organización se creó con éxito!'],
          () => this.router.navigateByUrl('/home'));
          this.auth.loadUser();
      })
      .catch((err) => {
        this.alertService.displayErrorAlert(['Error al crear la organización', err.error.message]);
      });
  }

  get sectoresArray() {
    return this.formulario.controls.sectores as FormArray;
  }

  borrar(index: number) {
    this.sectoresArray.removeAt(index);
  }

  agregarSector() {
    if (!this.nuevoSector.valid) {
      return;
    }
    this.sectoresArray.push(this.fb.control(this.nuevoSector.value, Validators.required));
    this.nuevoSector.reset();
  }
}


