import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store'
import { ExtendState } from '../extends'
import {
  UpdateDefaultApplicationAction,
  UpdateCustomApplicationAction,
  UpdateCurrentApplicationAction
} from '../actions/application.action'
import { Injectable } from '@angular/core'

@Injectable()
@State<any>({
  name: 'application',
  defaults: {
    default: [],
    custom: [],
    current: []
  }
})
export class ApplicationState extends ExtendState {
  /**
   * 更新默认应用列表
   * @param state
   * @param param1
   */
  @Action(UpdateDefaultApplicationAction)
  public updateDefaultApplication<T>(state: StateContext<any>, { config }: UpdateDefaultApplicationAction) {
    this.updateState(state, {
      default: config
    })
  }

  /**
   * 更新自定义应用列表
   * @param state
   * @param param1
   */
  @Action(UpdateCustomApplicationAction)
  public updateCustomApplication<T>(state: StateContext<any>, { config }: UpdateDefaultApplicationAction) {
    this.updateState(state, {
      custom: config
    })
  }

  /**
   * 更新应用列表
   * @param state
   * @param param1
   */
  @Action(UpdateCurrentApplicationAction)
  public updateCurrentApplication<T>(state: StateContext<any>, { config }: UpdateDefaultApplicationAction) {
    this.updateState(state, {
      current: config
    })
  }
}
