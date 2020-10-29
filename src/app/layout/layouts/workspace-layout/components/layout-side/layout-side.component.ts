import { isPlatformBrowser, isPlatformServer } from '@angular/common'
import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { Store } from '@ngxs/store'
import { navigateToUrl } from 'single-spa'
import { UpdateLayoutAction } from 'src/app/store/actions/config.action'
@Component({
  selector: 'app-layout-side',
  templateUrl: './layout-side.component.html',
  styleUrls: ['./layout-side.component.less']
})
export class LayoutSideComponent {
  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: any,
    private store: Store
  ) {}

  public applications: any[] = []

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.applicationConfig()
    }
  }

  public changeApplication(path) {
    this.store.dispatch(new UpdateLayoutAction('workspace'))
    setTimeout(() => {
      navigateToUrl(path)
    })
  }

  private applicationConfig() {
    this.applications = this.store.selectSnapshot((state) => state.application.current)
  }
}
