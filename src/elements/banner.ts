import { extend, onUserActivation } from "../utilities";

@extend("banner", "video")
export class Banner extends HTMLVideoElement {
  constructor(public props: Partial<Banner>) {
    super();
    Object.assign(this, props);
  }

  connectedCallback() {
    this.onclick = () => {
      if (this.paused) this.play();
      else this.pause();
    };

    onUserActivation(
      (ua) => {
        if (ua.isActive && this.paused) {
          this.scrollIntoView({ behavior: "smooth" });
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
