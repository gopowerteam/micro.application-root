import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from './layout.component'
import { WorkspaceLayoutComponent } from './layouts/workspace-layout/workspace-layout.component'
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component'
import { IconsProviderModule } from '../icons-provider.module'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutSideComponent } from './layouts/workspace-layout/components/layout-side/layout-side.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [LayoutComponent, WorkspaceLayoutComponent, EmptyLayoutComponent, LayoutSideComponent],
  imports: [SharedModule],
  exports: [LayoutComponent]
})
export class LayoutModule {}
