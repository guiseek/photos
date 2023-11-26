import { builtIn } from "../utilities";

interface Props {
  photos: Photo[];
  closeDialog(): void;
}

@builtIn("dialog")
export class Dialog extends HTMLDialogElement {
  connectedCallback() {
    this.classList.add("dialog");
  }

  clear() {
    while (this.firstChild) this.firstChild.remove();
  }

  openDialog(props: Props) {
    this.clear();

    const carousel = (
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
            <button id="prevBtn" onclick={() => carousel.scrollBy(-100, 0)}>
              <img src="./arrow-left.svg" alt="arrow left" />
            </button>
            <button id="nextBtn" onclick={() => carousel.scrollBy(100, 0)}>
              <img src="./arrow-right.svg" alt="arrow right" />
            </button>
          </div>
        </div>
        <button
          id="closeDialogBtn"
          className="closeDialog"
          onclick={() => props.closeDialog()}
        >
          <img src="./close.svg" alt="close" />
        </button>
      </>
    );

    this.append(template);
    this.showModal();
  }
}
