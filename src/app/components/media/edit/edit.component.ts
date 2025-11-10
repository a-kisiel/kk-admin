import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediumService } from '../../../services/medium.service';
import { Medium } from '../../../models/medium.model';
import { GenericModule } from '../../../generic/generic-module';

@Component({
  selector: 'app-edit-medium',
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditMediumComponent {
  constructor(private route: ActivatedRoute) {}

  generic = new GenericModule();

  mode: string;

  service = inject(MediumService);
  formBuilder = inject(FormBuilder);

  id: string | null = '';
  loading = true;
  medium: Medium = new Medium();

  mediumForm = this.formBuilder.group({
    title: ['', Validators.required]
  });

  submit() {
    if (this.mode === 'add') {
      this.service.create(this.mediumForm.value)
      .subscribe({
        next: () => {
          this.generic.toastr.success('Medium successfully added');
          this.generic.router.navigate(['/media']);
        },
        error: e => {
          this.generic.toastr.error('Error adding medium -- reload the page and try again');
        }
      });
    }
    else {
      this.service.update(this.id, this.mediumForm.value).subscribe({
        next: () => {
          this.generic.toastr.success(`${this.medium.title} successfully updated`);
          this.generic.router.navigate(['/media'])
        },
        error: e => {
          this.generic.toastr.error('Error updating -- reload the page and try again');
        }
      });
    }
  }

  delete() {
    if (confirm(`Are you sure you want to delete ${this.medium.title}?`)) {
      this.service.delete(this.id)
      .subscribe({
        next: () => {
          this.generic.toastr.success(`Successfully deleted ${this.medium.title}`);
          this.generic.router.navigate(['/media']);
        },
        error: e => {
          this.generic.toastr.error('Error deleting medium -- reload the page and try again');
        }
      });
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.id = p.get('id');
      if (!this.id)
        this.loading = false;
    });
    this.mode = this.id ? 'edit' : 'add';

    if (this.mode === 'edit') {
      this.service.get(this.id).subscribe((m) => {
        this.medium = m;
        this.mediumForm.setValue({
          'title': this.medium.title.toString()
        });
        this.loading = false;
      });
    }
  }
}
