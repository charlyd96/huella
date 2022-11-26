import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RolEnum } from '../../domain/enums/RolEnum';

@Directive({
  selector: '[appRol]'
})
export class RolDirective implements OnInit {

  @Input('appRol') roles!: RolEnum[];

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.update()
    this.authService.observableUserClaims.subscribe(() => this.update())
  }

  update() {
    if (this.roles.find(r => r == this.authService.userClaims?.rol)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }
    this.viewContainer.clear();
  }

}
