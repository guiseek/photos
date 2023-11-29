import { delay, extend, onUserActivation } from "../utilities";

@extend("banner", "video")
export class Banner extends HTMLVideoElement {
  #delayed = false;

  constructor(public props: Partial<Banner>) {
    super();
    Object.assign(this, props);
  }

  connectedCallback() {
    this.onclick = () => {
      if (this.#delayed) {
        if (this.paused) this.play();
        else this.pause();
      }
    };

    onUserActivation(
      (ua) => {
        if (ua.isActive && this.paused) {
          delay(() => (this.#delayed = true));
          this.focus();
          this.play();
        }
      },
      "keydown",
      "mousedown",
      "touchend"
    );

    this.onended = () => {
      const { height } = getComputedStyle(this);

      this.animate([{ height }, { height: "0px" }], {
        fill: "forwards",
        duration: 2000,
        iterations: 1,
      }).onfinish = () => this.remove();
    };
  }
}
