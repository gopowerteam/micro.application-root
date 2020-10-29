import { NgModule, OnInit, Renderer2 } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from './layout.component'
import { WorkspaceLayoutComponent } from './layouts/workspace-layout/workspace-layout.component'
import { IconsProviderModule } from '../icons-provider.module'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutSideComponent } from './layouts/workspace-layout/components/layout-side/layout-side.component'
import { SharedModule } from '../shared/shared.module'
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component'
import { CoreModule } from '../core/core.module'
import { RendererFactory2 } from '@angular/core'

@NgModule({
  declarations: [LayoutComponent, WorkspaceLayoutComponent, LayoutSideComponent, DefaultLayoutComponent],
  imports: [SharedModule, CoreModule],
  providers: [
    {
      provide: 'content',
      useFactory: (rendererFactory) => {
        const renderer = rendererFactory.createRenderer(null, null)
        const applicationContainer = renderer.createElement('main')
        applicationContainer.id = 'application-container'
        return applicationContainer
      },
      deps: [RendererFactory2]
    }
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {}
