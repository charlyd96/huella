import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appRequiereSesion]'
})
export class RequiereSesionDirective {
  @Input('appRequiereSesion') requiereSesion!: Boolean;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService) {
  }
  showing: boolean = false;

  ngOnInit(): void {
    this.update()
    this.authService.observableUserClaims.subscribe(() => this.update())
  }

  update() {
    if (!this.requiereSesion && !this.authService.estaLogeado()) {

      if (this.showing)
        return;

      this.viewContainer.createEmbeddedView(this.templateRef);
      this.showing = true;
      return;
    }

    if (this.requiereSesion && this.authService.estaLogeado()) {
      if (this.showing)
        return;

      this.viewContainer.createEmbeddedView(this.templateRef);
      this.showing = true;
      return;
    }

    this.viewContainer.clear();
    this.showing = false;
  }

}
