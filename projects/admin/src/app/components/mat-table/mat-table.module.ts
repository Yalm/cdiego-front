import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from './mat-table.component';
import { RouterModule } from '@angular/router';
import {
    MatTableModule as MaterialTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';
import { KeyPipe } from './key.pipe';

@NgModule({
    declarations: [
        MatTableComponent,
        KeyPipe
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MaterialTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        RouterModule,
        MatInputModule
    ],
    exports: [MatTableComponent]
})
export class MatTableModule { }
