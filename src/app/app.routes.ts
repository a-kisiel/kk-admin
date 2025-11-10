import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PiecesListComponent } from './components/pieces/list/list.component';
import { EditPieceComponent } from './components/pieces/edit/edit.component';
import { MediumListComponent } from './components/media/list/list.component';
import { EditMediumComponent } from './components/media/edit/edit.component';
import { CollectionListComponent } from './components/collections/list/list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditCollectionComponent } from './components/collections/edit/edit.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'pieces', component: PiecesListComponent, canActivate: [AuthGuard] },
    { path: 'pieces/add', component: EditPieceComponent, canActivate: [AuthGuard] },
    { path: 'pieces/:id', component: EditPieceComponent, canActivate: [AuthGuard] },
    { path: 'media', component: MediumListComponent, canActivate: [AuthGuard] },
    { path: 'media/add', component: EditMediumComponent, canActivate: [AuthGuard] },
    { path: 'media/:id', component: EditMediumComponent, canActivate: [AuthGuard] },
    { path: 'collections', component: CollectionListComponent, canActivate: [AuthGuard]},
    { path: 'collections/add', component: EditCollectionComponent, canActivate: [AuthGuard]},
    { path: 'collections/:id', component: EditCollectionComponent, canActivate: [AuthGuard]},
];
