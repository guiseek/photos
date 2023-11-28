export type UserActivationEvents = Pick<
  WindowEventMap,
  "keydown" | "mousedown" | "pointerdown" | "pointerup" | "touchend"
>;

export interface UserActivationCallback {
  (userActivation: UserActivation): void;
}

export function onUserActivation<K extends keyof UserActivationEvents>(
  cb: UserActivationCallback,
  ...events: K[]
) {
  function fn() {
    cb(navigator.userActivation);
    events.map(function (event) {
      removeEventListener(event, fn);
    });
  }

  events.map((event) => addEventListener(event, fn));
}
