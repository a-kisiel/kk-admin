import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PieceService } from '../../../services/piece.service';
import { CollectionService } from '../../../services/collection.service';
import { MediumService } from '../../../services/medium.service';
import { Collection } from '../../../models/collection.model';
import { Piece } from '../../../models/piece.model';
import { Medium } from '../../../models/medium.model';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericModule } from '../../../generic/generic-module';

@Component({
  selector: 'app-edit-piece',
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    GenericModule,
    FormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditPieceComponent {
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  generic = new GenericModule();

  mode: string;
  loading = true;
  chooseParent = true;
  draggingFile = false;
  uploadFile = true;

  service = inject(PieceService);
  mediumService = inject(MediumService);
  collectionService = inject(CollectionService);

  id: string | null = '';
  piece = new Piece();
  imgUrl = '';
  media = <Medium[]> [];
  selectedMedia: Medium[] = [];
  collections = <Collection[]> [];
  selectedCollections: Collection[] = [];
  existingPieces: Piece[] = [];
  children: any[] = [];
  file: File;

  pieceForm: FormGroup;

  toggleParent() {
    this.chooseParent = !this.chooseParent;
  };

  toggleUpload() {
    this.uploadFile = !this.uploadFile;
  };

  onDragOver(e: any) {
    e.preventDefault();
    this.draggingFile = true;
  };

  onDragLeave() {
    this.draggingFile = false;
  };

  onDropSuccess(e: any) {
    e.preventDefault();
    this.changeFile(e.dataTransfer.files);
    this.draggingFile = false;
  };

  changeFile(files: File[]) {
    if (files)
      this.file = files[0];
  };

  delete() {
    if (confirm(`Are you sure you want to delete ${this.piece.title}?`)) {
      this.service.delete(this.id)
      .subscribe({
        next: res => {
          this.generic.toastr.success(`${this.piece.title} successfully deleted`);
          this.generic.router.navigate(['/pieces']);
        },
        error: e => {
          this.generic.toastr.error('Error deleting -- reload the page and try again');
        }
      });
    }    
  };

  submit() {
    if (this.mode === 'add') {
      this.service.create(this.pieceForm.value)
      .subscribe({
        next: res => {
          this.generic.toastr.success(`${this.piece.title} successfully added`);
          this.generic.router.navigate(['/pieces']);
        },
        error: e => {
          this.generic.toastr.error('Error saving -- reload the page and try again');
        }
      });
    }
    else {
      // if (this.file && this.piece.filename.toString() !== '') {
      //   if (!confirm('This piece already has an image file associated with it -- continuing will overwrite it. Continue?'))
      //     return;
      // }
      this.service.update(this.id, this.pieceForm.value)
      .subscribe({
        next: res => {
          this.generic.toastr.success(`${this.piece.title} successfully updated`);
          this.generic.router.navigate(['/pieces']);
        },
        error: e => {
          this.generic.toastr.error('Error saving -- reload the page and try again');
        }
      });
    }
  };

  ngOnInit() {
    this.route.paramMap.subscribe(p => this.id = p.get('id'));
    this.mode = this.id ? 'edit' : 'add';

    this.pieceForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      filename: [''],
      date: [''],
      media: [[[]]],
      collections: [[[]]],
      parent: [],
      children: [[[]]],
      description: [''],
      active: [false],
      useAsWallpaper: [false]
    });

    if (this.id) {
      this.service.get(this.id).subscribe({
        next: p => {
          this.piece = p;

          this.imgUrl = p.filename ?
            `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/${p.filename}.webp` :
            'assets/image.svg';

          this.pieceForm.patchValue({
            id: this.piece.id,
            title: this.piece.title.toString(),
            filename: this.piece.filename?.toString(),
            date: this.piece.date?.toString(),
            description: this.piece.description?.toString(),
            parent: this.piece.parent,
            active: !!this.piece.active,
            useAsWallpaper: !!this.piece.use_as_wallpaper
          });

          if (this.piece.media instanceof Array) {          
            this.pieceForm.patchValue({
              media: this.piece.media
            });
          }

          if (this.piece.collections instanceof Array) {
            this.pieceForm.patchValue({
              collections: this.piece.collections
            });
          }

          if (this.piece.children instanceof Array) {
            this.pieceForm.patchValue({
              children: this.piece.children
            });
          }

          this.loading = false;
        },
        error: e => {
          if (e.status === 403)
            this.generic.router.navigate(['/login']);
        }
      });
    }
    else
      this.loading = false;

    this.collectionService.getAll()
    .subscribe(c => {
      this.collections = c
    });

    this.mediumService.getAll()
    .subscribe(m => {
      this.media = m
    });

    this.service.getAll()
    .subscribe(p => {
      this.existingPieces = p;
    });
  }
}
