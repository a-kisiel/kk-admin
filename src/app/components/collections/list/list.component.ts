import { Component, inject } from '@angular/core';
import { CollectionService } from '../../../services/collection.service';
// import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-collection-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class CollectionListComponent {
  service = inject(CollectionService);
  loading = true;
  
  collections: any[] = [];

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      res.forEach(c => this.collections.push(c));
      this.loading = false;
    });
  }
}
