import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class GenericModule {
  router = inject(Router);
  toastr = inject(ToastrService);
}
