import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../shared/components/alert/alert.component';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalService: NgbModal) { }

    displayAlert(title: string, messages: string[], acceptFunction: any = null, cancelFunction: any = null, displayCancel = false) {
        const modalRef = this.modalService.open(AlertComponent);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.messages = messages;
        modalRef.componentInstance.displayCancel = displayCancel;
        modalRef.result.then((result) => {
            if (result) {
                modalRef.result.then(acceptFunction);
            } else {
                modalRef.result.then(cancelFunction);
            }
        }, cancelFunction).catch(() => { });
    }

    displayErrorAlert(messages: string[], acceptFunction: any = null, cancelFunction: any = null, displayCancel = false) {
        this.displayAlert('Error',messages, acceptFunction, cancelFunction, displayCancel);
    }
}
