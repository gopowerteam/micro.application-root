import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store'
import { ExtendState } from '../extends'
import {
  UpdateDefaultApplicationAction,
  UpdateCustomApplicationAction,
  UpdateCurrentApplicationAction
} from '../actions/application.action'
import { Injectable } from '@angular/core'
import { UpdateLayoutAction } from '../actions/config.action'

@Injectable()
@State<any>({
  name: 'config',
  defaults: {
    layout: 'default'
  }
})
export class ConfigState extends ExtendState {
  /**
   * 更新默认应用列表
   * @param state
   * @param param1
   */
  @Action(UpdateLayoutAction)
  public updateLayout<T>(state: StateContext<any>, { layout }: UpdateLayoutAction) {
    this.updateState(state, {
      layout
    })
  }
}
