import { builtIn } from "../utilities";

interface Props {
  photos: Photo[];
  index: number;
}

@builtIn("dialog")
export class Dialog extends HTMLDialogElement {
  #width = 0;

  connectedCallback() {
    this.classList.add("dialog");
  }

  clear() {
    while (this.firstChild) this.firstChild.remove();
  }

  async handleTransition(photos: Photo[], index: number) {
    console.log(index);

    const transition = document.startViewTransition(async () =>
      this.openDialog({ photos, index })
    );
    try {
      await transition.finished;
    } finally {
      const image = this.#getImages().at(index);
      if (image) {
        carousel.scrollBy(image.width * index, 0);
        this.#width = image.width;
      }
    }
  }

  closeDialog = () => {
    if (!document.startViewTransition) this.close();
    else document.startViewTransition(async () => this.close());
  };

  select({ photos, index }: Props) {
    if (!document.startViewTransition) {
      this.openDialog({ photos, index });
    } else this.handleTransition(photos, index);
  }

  openDialog(props: Props) {
    this.clear();

    const carousel: HTMLDivElement = (
      <div className="carousel" id="carousel">
        {props.photos.map((photo) => (
          <picture>
            <img src={photo.path} loading="lazy" />
          </picture>
        ))}
      </div>
    );

    const template = (
      <>
        <div className="dialogContainer">
          {carousel}

          <div className="controls">
            <button
              id="prevBtn"
              onclick={() => carousel.scrollBy(-this.#width, 0)}
            >
              <img src="./arrow-left.svg" alt="arrow left" />
            </button>
            <button
              id="nextBtn"
              onclick={() => carousel.scrollBy(this.#width, 0)}
            >
              <img src="./arrow-right.svg" alt="arrow right" />
            </button>
          </div>
        </div>
        <button
          id="closeDialogBtn"
          className="closeDialog"
          onclick={() => this.closeDialog()}
        >
          <img src="./close.svg" alt="close" />
        </button>
      </>
    );

    this.append(template);
    this.showModal();
  }

  #getImages(): HTMLImageElement[] {
    return Array.from(this.querySelectorAll("#carousel img"));
  }
}
