import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MiembroService } from '../../../services/miembro.service';
import { Router } from '@angular/router';
import { OrganizacionService } from '../../../services/organizacion.service';
import { Organizacion } from 'src/app/domain/models/organizacion/Organizacion';
import { AlertService } from '../../../services/alert.service';
import { Persona } from 'src/app/domain/models/organizacion/Persona';
import { CrearMiembroModel } from 'src/app/domain/models/CrearMiembroModel';

@Component({
  selector: 'app-register',
  templateUrl: './registro-miembro.html',
  styleUrls: [
      './registro-miembro.css',
  ]
})
export class RegistroMiembro implements OnInit {

  formularioRegPersonas = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    tipoDoc: ['', Validators.required],
    nroDocumento: ['', Validators.required],//,Validators.minLength(7) ,Validators.maxLength(8)]]
    mail: ['', Validators.required],
    organizacion: ['', Validators.required],
    sector: ['', Validators.required]
  });
  organizaciones: Organizacion[] = [];
  organizacionSeleccionada!: Organizacion;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private personaService: MiembroService,
    private router: Router,
    private organizacionService: OrganizacionService,
    private alertService: AlertService) { }

  async ngOnInit() {
    if (this.authService.esMiembro() && !this.authService.miembro.aprobado) {
      this.alertService.displayAlert('Aviso', [`Tiene pendiente una adhesión para la organización ${this.authService.miembro.organizacion.nombre}`]);
      return;
    }

    if (!this.authService.esSoloUsuarioRegistrado()) {
      this.router.navigateByUrl('/home');
    }

    this.organizacionService.getOrganizaciones()
    .then((organizacionesResponse) => {
      this.organizaciones = organizacionesResponse;
    })
    .catch((err) => this.alertService.displayErrorAlert(['Error al cargr las organizaciones', err.error.message]));
  }

  agregarPersona() {
    if (this.formularioRegPersonas.invalid) {
      console.log("form: ", this.formularioRegPersonas.value);

      this.alertService.displayAlert('Aviso', ['Hay campos obligatorios sin completar']);
      this.formularioRegPersonas.markAllAsTouched();
      return;
    }

    let personaModel: Persona = <Persona> {
      nombre: this.formularioRegPersonas.controls.nombre.value,
      apellido: this.formularioRegPersonas.controls.apellido.value,
      tipoDoc: this.formularioRegPersonas.controls.tipoDoc.value,
      nroDocumento:  this.formularioRegPersonas.controls.nroDocumento.value,
      mail:  this.formularioRegPersonas.controls.mail.value
    }

    let miembroModel: CrearMiembroModel = <CrearMiembroModel> {
      persona: personaModel,
      organizacionId: this.organizacionSeleccionada.id,
      sectorId: this.formularioRegPersonas.controls.sector.value.id
    }

    this.personaService.crearPersona(miembroModel)
      .then(() =>{
        this.formularioRegPersonas.reset()
        this.alertService.displayAlert('Aviso', ['Tu adhesión como miembro a la organización fue ralizada', 'Ahora debés esperar a que seas aprobado']);
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        this.alertService.displayErrorAlert(['Ocurrió un error al querer adherirte a la organización.', err.error.message]);
      })
  }

    public get tiposDocumentos() {
      return this.authService.systemEnums?.tipoDocumento;
    }

    setOrganizacion() {
      this.organizacionSeleccionada = this.formularioRegPersonas.controls.organizacion.value;
    }
}

