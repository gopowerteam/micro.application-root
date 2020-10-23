import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { WorkspaceLayoutComponent } from './layouts/workspace-layout/workspace-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    WorkspaceLayoutComponent,
    EmptyLayoutComponent,
  ],
  imports: [CommonModule],
})
export class LayoutModule {}
