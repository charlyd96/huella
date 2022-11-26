import { Component, Input, OnInit } from '@angular/core';
import { Trayecto } from 'src/app/domain/models/viajes/Trayecto';
import { SystemEnums } from '../../../domain/enums/SystemEnums';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mostrar-trayecto',
  templateUrl: './mostrar-trayecto.component.html',
  styles: [
  ]
})
export class MostrarTrayectoComponent implements OnInit {

  @Input() trayecto!: Trayecto;
  systemEnums!: SystemEnums

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.systemEnums = this.authService.systemEnums;
  }

}
