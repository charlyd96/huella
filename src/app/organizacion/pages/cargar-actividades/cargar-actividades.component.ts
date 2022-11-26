import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-cargar-actividades',
  templateUrl: './cargar-actividades.component.html',
  styles: [
  ]
})
export class CargarActividadesComponent implements OnInit {

  constructor(private fileService: FileService,
    private alertService: AlertService) { }

  file!: File;
  loading: Boolean = false;

  ngOnInit(): void {
  }

  upload() {
    let formData:FormData = new FormData();
    formData.append('uploadFile', this.file, this.file.name);
    this.loading = true;
    this.fileService.upload(formData).then( () => {
      this.alertService.displayAlert('Aviso', ['Su archivo fue cargado con éxito y se está procesando', 'Será notificado cuando el proceso haya terminadi']);
    })
    .catch((err) => {
      this.alertService.displayErrorAlert(['Ocurrió un error al cargar el archivo', err.error.message]);
    })
    .finally(() => this.loading = false);
  }

  archivoSeleccionado(event: any) {
    this.file = event.target.files[0];
  }

  changeLoading() {
    this.loading = !this.loading;
  }
}
