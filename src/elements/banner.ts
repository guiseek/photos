import {
  create,
  delay,
  extend,
  interval,
  onUserActivation,
} from "../utilities";

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
      } else {
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

    const overlay = create("div", {
      className: "bannerOverlay",
      style: {
        backgroundColor: "black",
        position: "absolute",
        opacity: 0,
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
      },
    });

    this.onplay = () => {
      this.volume = 0;

      const $interval = interval(() => {
        this.volume += 0.2;
        if (this.volume === 1) {
          $interval.cancel();
        }
      }, 200);

      overlay.animate([{ opacity: 1 }, { opacity: 0.5 }, { opacity: 0 }], {
        duration: 2000,
        iterations: 1,
      }).onfinish = () => overlay.remove();
    };

    this.onended = () => {
      const { height } = getComputedStyle(this);

      this.animate([{ height }, { height: "0px" }], {
        fill: "forwards",
        duration: 2000,
        iterations: 1,
      }).onfinish = () => this.remove();
    };

    if (this.parentElement) {
      this.parentElement.append(overlay);
    }
  }
}
