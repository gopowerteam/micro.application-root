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
  ngOnInit(): void {}

  public changeApplication(path) {
    console.log(path)
    navigateToUrl(path)
  }

  public get applications() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('applications'))
    } else {
      return []
    }
  }
}
