import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,   
    private router: Router) { }

  async ngOnInit() {
    console.log("Ruta: ",this.router.url);
  }

}
