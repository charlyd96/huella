import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from 'src/app/domain/models/Usuario';
import { usuarioService } from '../../../services/usuarioService.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
         './register.component.css',
    ]
})

export class RegisterComponent implements OnInit {

  formularioCrearUsuario = this.formBuilder.group({
     contrasenia: ['', Validators.required],
     usuarioContraseniaRepetir: ['', Validators.required,],
     usuario: ['', Validators.required],
     mail: ['', Validators.required],
  }, {
    validators: [this.camposIguales('contrasenia', 'usuarioContraseniaRepetir')]
  })

  constructor(private formBuilder: FormBuilder,
    private usuarioService: usuarioService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService) { }

  async ngOnInit() {
    if (this.authService.estaLogeado()) {
      this.router.navigateByUrl('/home');
    }
  }

  crearUsuario(){
    if (this.formularioCrearUsuario.invalid) {
      this.formularioCrearUsuario.markAllAsTouched();
      return;
    }

    let usuarioModel: Usuario = <Usuario> {
      contrasenia: this.formularioCrearUsuario.controls.contrasenia.value,
      usuario: this.formularioCrearUsuario.controls.usuario.value,
      mail:  this.formularioCrearUsuario.controls.mail.value
    }
    this.usuarioService.crearUsuario(usuarioModel)
    .then(() => {
      this.formularioCrearUsuario.reset();
      this.alertService.displayAlert('Aviso', ['Usuario creado con éxito!'], null, null, false);
      this.router.navigateByUrl('/login')
    })
    .catch((err) => {
      this.alertService.displayErrorAlert([err.error.message], null, null, false)
    })
}

private camposIguales(campo1: string, campo2: string) {
  return (formGroup: AbstractControl): ValidationErrors | null  => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      }

      formGroup.get(campo2)?.setErrors(null);
      return null;
    }
  }

  campoInvalido(campo: string) {
    return this.formularioCrearUsuario.controls[campo].invalid && this.formularioCrearUsuario.controls[campo].touched;
  }

  public get getRepetirContraseniaError(): string {
    if (this.formularioCrearUsuario.errors?.required) {
      return 'El campo es requerido';
    }

    if (this.formularioCrearUsuario.errors?.noIguales) {
      return 'Los passwords no coinciden';
    }

    return '';
  }
}
