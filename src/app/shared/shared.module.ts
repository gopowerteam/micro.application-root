import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { IconsProviderModule } from '../icons-provider.module'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzPipesModule } from 'ng-zorro-antd/pipes'

const ANTD_MODULES = [
  NzModalModule,
  NzLayoutModule,
  NzMenuModule,
  NzDrawerModule,
  NzTableModule,
  NzSpaceModule,
  NzGridModule,
  NzButtonModule,
  NzPipesModule
]
const COMPONENTS = []
const DIRECTIVES = []
const PIPES = []
const THIRDS = []

@NgModule({
  imports: [
    ...ANTD_MODULES,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IconsProviderModule
  ],
  providers: [],
  entryComponents: [...COMPONENTS],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  exports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    IconsProviderModule,
    ...ANTD_MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class SharedModule {}
