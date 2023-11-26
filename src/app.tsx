import { photos } from "./data/photos";
import { queryAll } from "./utilities";
import { Dialog } from "./elements";

export const app = () => {
  const dialog = new Dialog();

  async function handleTransition(index: number) {
    const transition = document.startViewTransition(async () =>
      dialog.openDialog({ photos, closeDialog })
    );
    try {
      await transition.finished;
    } finally {
      console.log(index);

      queryAll("#carousel img").at(index)?.scrollIntoView();
    }
  }

  const closeDialog = () => {
    if (!document.startViewTransition) dialog.close();
    else document.startViewTransition(async () => dialog.close());
  };

  const openDialog = (index: number) => {
    if (!document.startViewTransition) {
      dialog.openDialog({ photos, closeDialog });
    } else {
      handleTransition(index);
    }
  };

  return (
    <>
      <section>
        <div className="imageGallery">
          {photos.map((photo, idx) => (
            <button onclick={() => openDialog(idx)}>
              <figure>
                <img src={photo.path} />
                <figcaption>
                  <address>{photo.address}</address>
                  <time>{photo.time}</time>
                </figcaption>
              </figure>
            </button>
          ))}
        </div>

        {dialog}
      </section>
    </>
  );
};
