import { Component, inject, OnInit } from '@angular/core';
import { PieceService } from '../../../services/piece.service';

@Component({
  selector: 'app-pieces-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class PiecesListComponent {
  service = inject(PieceService);
  loading = true;

  pieces: any[] = [];

  ngOnInit() {
    this.service.getAll({is_parent: true}).subscribe(res => {
      res.forEach(p =>  {
        const po: any = p;
        po.url = p.filename ?
          `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/${p.filename}.webp` :
          'assets/image.svg';
        this.pieces.push(p);
      });
      this.loading = false;
    });
  }
}