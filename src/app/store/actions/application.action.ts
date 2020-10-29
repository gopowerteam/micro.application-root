export class UpdateDefaultApplicationAction {
  public static readonly type = '[Application] UpdateDefaultApplicationAction'
  constructor(public config) {}
}

export class UpdateCustomApplicationAction {
  public static readonly type = '[Application] UpdateCustomApplicationAction'
  constructor(public config) {}
}

export class UpdateCurrentApplicationAction {
  public static readonly type = '[Application] UpdateCurrentApplicationAction'
  constructor(public config) {}
}
