import { builtIn } from "../utilities";

interface Props {
  photos: Photo[];
  index: number;
}

@builtIn("dialog")
export class Carousel extends HTMLDialogElement {
  #width = 0;

  connectedCallback() {
    this.classList.add("carousel");
  }

  clear() {
    while (this.firstChild) this.firstChild.remove();
  }

  async handleTransition(photos: Photo[], index: number) {
    const transition = document.startViewTransition(async () =>
      this.openDialog({ photos, index })
    );
    try {
      await transition.finished;
    } finally {
      const image = this.#getImages().at(index);
      if (image) this.#width = image.width;
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

  openDialog({ photos, index }: Props) {
    this.clear();

    const carousel: HTMLDivElement = (
      <div className="carousel" id="carousel">
        {photos.map((photo) => (
          <picture>
            <img src={photo.path} loading="lazy" />
          </picture>
        ))}
      </div>
    );

    const template = (
      <>
        <div className="carouselContainer">
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

    if (!this.#width) {
      const image = this.#getImages().at(index);
      if (image) this.#width = image.width;
    }

    carousel.scrollBy(this.#width * index, 0);
  }

  #getImages(): HTMLImageElement[] {
    return Array.from(this.querySelectorAll("#carousel img"));
  }
}
