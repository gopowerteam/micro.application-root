import { isPlatformBrowser } from '@angular/common'
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core'
import { Store } from '@ngxs/store'
import { UpdateCustomApplicationAction } from 'src/app/store/actions/application.action'

import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-dev-tools',
  templateUrl: './dev-tools.component.html',
  styleUrls: ['./dev-tools.component.less']
})
export class DevToolsComponent implements OnInit {
  // 开发工具是否可见
  public visible = false

  public dataSource: any[] = []
  public editSource: { [key: string]: { edit: boolean; create: boolean; data: any } } = {}

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: string,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getApplicationsConfig()
      this.updateEditCache()
    }
  }

  public onOpenDevTools() {
    this.visible = true
  }

  private updateEditCache(): void {
    this.dataSource.forEach((item) => {
      this.editSource[item.id] = {
        edit: false,
        create: false,
        data: { ...item, menu: JSON.stringify(item.menu) }
      }
    })
  }

  private getApplicationsConfig() {
    this.dataSource = this.store
      .selectSnapshot((state) => state.application.current)
      .map((app) => ({
        ...app,
        id: Math.random().toString(32)
      }))
  }

  public startEdit(id: string): void {
    this.editSource[id].edit = true
  }

  public cancelEdit(id: string): void {
    const index = this.dataSource.findIndex((item) => item.id === id)
    this.editSource[id] = {
      data: { ...this.dataSource[index] },
      edit: false,
      create: false
    }
  }

  public saveEdit(id: string): void {
    const index = this.dataSource.findIndex((item) => item.id === id)
    Object.assign(this.dataSource[index], this.editSource[id].data)

    this.updateCustomApplication(this.editSource[id].data)

    this.editSource[id].edit = false
    this.editSource[id].create = false
  }

  public onAddApplication() {
    const app = {
      id: Math.random().toString(32),
      name: '',
      host: '',
      menu: '',
      path: '',
      title: '',
      port: ''
    }

    this.dataSource = [...this.dataSource, app]
    this.editSource[app.id] = {
      edit: true,
      create: true,
      data: { ...app }
    }
  }

  private updateCustomApplication(data) {
    data.menu = JSON.parse(data.menu)
    const customConfig = this.store.selectSnapshot((state) => state.application.custom) || []
    console.log(customConfig)
    console.log([...customConfig.filter((x) => x.id !== data.id), data])
    // 更新应用列表
    this.store.dispatch(new UpdateCustomApplicationAction([...customConfig.filter((x) => x.id !== data.id), data]))
  }
}
