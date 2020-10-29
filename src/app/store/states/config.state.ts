import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store'
import { ExtendState } from '../extends'
import { GetConfigAction, UpdateConfigAction, SaveConfigAction } from '../actions/config.action'
import { environment } from '../../../environments/environment'

@State<any>({
  name: 'config',
  defaults: null
})
export class ConfigState extends ExtendState {
  @Action(UpdateConfigAction)
  public updateConfig<T>(state: StateContext<any>, { config }: UpdateConfigAction) {
    this.updateState(state, config)
  }

  @Action(SaveConfigAction)
  public saveConfig<T>(state: StateContext<any>) {
    const config = state.getState()

    this.updateState(state, { ready: true })
  }
}
