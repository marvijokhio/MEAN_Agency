import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers.component';
import { AddProvidersComponent } from './add-providers/add-providers.component';
import { EditProvidersComponent } from './edit-providers/edit-providers.component';
import { DetailsProvidersComponent } from './details-providers/details-providers.component';
import { DeleteProvidersComponent } from './delete-providers/delete-providers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteAllComponent } from './delete-all/delete-all.component';

@NgModule({
  declarations: [ProvidersComponent, AddProvidersComponent, 
    EditProvidersComponent, DetailsProvidersComponent, 
    DeleteProvidersComponent, DeleteAllComponent],
  imports: [
    CommonModule, RouterModule , ReactiveFormsModule
  ],
  exports: [ReactiveFormsModule, ProvidersComponent, AddProvidersComponent, 
    EditProvidersComponent, DetailsProvidersComponent, 
    DeleteProvidersComponent, DeleteAllComponent]
})
export class ProvidersModule { }
