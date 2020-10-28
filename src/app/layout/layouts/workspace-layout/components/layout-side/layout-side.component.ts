import { isPlatformBrowser, isPlatformServer } from '@angular/common'
import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { navigateToUrl } from 'single-spa'
@Component({
  selector: 'app-layout-side',
  templateUrl: './layout-side.component.html',
  styleUrls: ['./layout-side.component.less']
})
export class LayoutSideComponent {
  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: any
  ) {}

  public applications: any[] = []

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.applicationConfig()
    }
  }

  public changeApplication(path) {
    navigateToUrl(path)
  }

  private applicationConfig() {
    const applications = JSON.parse(localStorage.getItem('applications'))
    const applications_custom = (JSON.parse(localStorage.getItem('applications_custom')) as any[]) || []
    this.applications = Array.from(new Set([...applications, ...applications_custom].map((x) => x.name)))
      .map((name) => {
        const app = applications_custom.find((x) => x.name === name) || applications.find((x) => x.name === name)
        return app
      })
      .filter((x) => x)
  }
}
