export class GetConfigAction {
  public static readonly type = '[Config] GetConfig'
  constructor() {}
}

export class UpdateConfigAction {
  public static readonly type = '[Config] UpdateConfig'
  constructor(public config) {}
}

export class SaveConfigAction {
  public static readonly type = '[Config] SaveConfig'
  constructor() {}
}
