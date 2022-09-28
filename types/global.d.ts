interface Window {
  $loadingBar: any;
  $notification: any;
  $message: any;
  $dialog: any;
}

declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;

declare interface ChangeEvent extends Event {
  target: HTMLInputElement;
}
