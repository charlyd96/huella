import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalizacionService } from '../../services/localizacion-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private localizacionService: LocalizacionService) { }

  async ngOnInit() {
  }

  async probarGet() {
    console.log("Probando get:", await this.authService.probarGet());
  }

  async probarPost() {
    console.log("Probando post:", await this.authService.probarPost());

  }

  async probarApiLocalizacion() {
    console.log("Probando api localizacion:", await this.localizacionService.getLocalidades(2));

  }

}
