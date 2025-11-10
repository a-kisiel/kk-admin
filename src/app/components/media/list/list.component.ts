import { Component, inject } from '@angular/core';
import { MediumService } from '../../../services/medium.service';
// import { MatIconModule } from '@angular/material/icon';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medium-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class MediumListComponent {
  // toastr = inject(ToastrService)
  service = inject(MediumService)
  loading = true;

  media: any[] = [];

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      res.forEach(m => this.media.push(m));
      this.loading = false;
    });
  }
}