import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core'
import { Store } from '@ngxs/store'
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component'
import { WorkspaceLayoutComponent } from './layouts/workspace-layout/workspace-layout.component'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  public isCollapsed = false
  public layout = 'default'

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef

  constructor(
    private store: Store,
    private resolver: ComponentFactoryResolver,
    private cfResolver: ComponentFactoryResolver,
    public vcRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  private factorys = {
    workspace: {
      component: null,
      factory: this.resolver.resolveComponentFactory(WorkspaceLayoutComponent)
    },
    default: {
      component: null,
      factory: this.resolver.resolveComponentFactory(DefaultLayoutComponent)
    },
    empty: {
      component: null,
      factory: this.resolver.resolveComponentFactory(DefaultLayoutComponent)
    }
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.config.layout)
      .subscribe((layout) => {
        this.layout = layout
        // 分离容器
        this.container.detach()
        // 获取当前步骤组件
        const current = this.factorys[layout]
        // 如果已生成竹节插入视图
        // 否则重新创建组件
        this.container.createComponent(current.factory)
      })
  }
}
