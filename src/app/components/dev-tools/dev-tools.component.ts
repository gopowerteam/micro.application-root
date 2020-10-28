import { isPlatformBrowser } from '@angular/common'
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core'

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
    private platformId: string
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
    const applications_consul = (JSON.parse(localStorage.getItem('applications')) as any[]) || []
    const applications_custom = (JSON.parse(localStorage.getItem('applications_custom')) as any[]) || []

    const applications = new Set([...applications_consul, ...applications_custom].map((x) => x.name))

    this.dataSource = Array.from(applications).map((name) => {
      const app = applications_custom.find((x) => x.name === name) || applications_consul.find((x) => x.name === name)
      app.id = app.id || Math.random().toString(32)
      return app
    })
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
    const applications = (JSON.parse(localStorage.getItem('applications_custom')) as any[]) || []

    const applications_custom = applications.filter((x) => x.id !== data.id)
    data.menu = JSON.parse(data.menu)

    localStorage.setItem('applications_custom', JSON.stringify([...applications_custom, data]))
  }
}
