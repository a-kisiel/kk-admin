import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CollectionService } from '../../../services/collection.service';
import { Collection } from '../../../models/collection.model';
import { GenericModule } from '../../../generic/generic-module';
// import { MatIconModule } from '@angular/material/icon';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-collection',
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditCollectionComponent {
  constructor(private route: ActivatedRoute) {}

  generic = new GenericModule();

  service = inject(CollectionService);
  formBuilder = inject(FormBuilder);

  mode: string;
  id: string | null = '';
  loading = true;
  collection: Collection = new Collection();

  collectionForm = this.formBuilder.group({
    title: ['', Validators.required],
    location: [''],
    start_date: [''],
    end_date: [''],
    description: [''],
    active: [true]
  });

  submit() {
    if (this.mode === 'add') {
      this.service.create(this.collectionForm.value)
      .subscribe({
        next: () => {
          this.generic.toastr.success('Collection added successfully');
          this.generic.router.navigate(['/collections/']);
        },
        error: e => {
          this.generic.toastr.error('Error adding collection -- reload the page and try again');
        }
      })
    }
    else {
      this.service.update(this.id, this.collectionForm.value).subscribe({
        next: () => {
          this.generic.toastr.success(`${this.collection.title} successfully updated`);
          this.generic.router.navigate(['/collections/']);
        },
        error: e => {
          this.generic.toastr.error('Error updating collection -- reload the page and try again');
        }
      });
    }
  }

  delete() {
    if (confirm(`Are you sure you want to delete ${this.collection.title}?`)) {
      this.service.delete(this.id)
      .subscribe({
        next: () => {
          this.generic.toastr.success(`Successfully deleted ${this.collection.title}`);
          this.generic.router.navigate(['/collections']);
        },
        error: e => {
          this.generic.toastr.error('Error deleting collection -- reload the page and try again');
        }
      });
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((p) => {
      this.id = p.get('id');
      if (!this.id)
        this.loading = false;
    });
    this.mode = this.id ? 'edit' : 'add';

    this.service.get(this.id).subscribe((c) => {
      this.collection = c;
      this.collectionForm.setValue({
        title: this.collection.title.toString(),
        location: this.collection.location?.toString() ?? '',
        start_date: this.collection.start_date.toString(),
        end_date: this.collection.end_date.toString(),
        description: this.collection.description?.toString() ?? '',
        active: !!this.collection.active
      });
      this.loading = false;
    });
  }
}
