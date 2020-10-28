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
      this.applications = JSON.parse(localStorage.getItem('applications'))
    }
  }

  public changeApplication(path) {
    navigateToUrl(path)
  }
}
