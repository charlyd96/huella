import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginUsuario } from 'src/app/domain/models/LoginUsuario';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',]
})
export class LoginComponent implements OnInit {

  formIniciarSesion = this.formBuilder.group({
     contrasenia: ['', Validators.required],
     usuario: ['', Validators.required],
  })
  loading: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.estaLogeado()) {
      this.router.navigateByUrl('/home');
    }
  }

  async iniciarSesion() {
    if (this.formIniciarSesion.invalid) {
      this.alertService.displayErrorAlert(['Debe ingresar el usuario y la contraseña'], null, null, false);
      return;
    }

    let usuarioLogin = <LoginUsuario> this.formIniciarSesion.value;
    this.loading = true;
    await this.authService.login(usuarioLogin);
    this.loading = false
  }
}

