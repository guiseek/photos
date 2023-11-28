import { album as photos } from "./data/album";
import { Dialog, Banner } from "./elements";
import { queryAll } from "./utilities";

export const app = () => {
  const dialog = new Dialog();
  const banner = new Banner({
    src: "./main.mp4",
    width: 936,
  });

  async function handleTransition(index: number) {
    const transition = document.startViewTransition(async () =>
      dialog.openDialog({ photos, closeDialog })
    );
    try {
      await transition.finished;
    } finally {
      const image = queryAll("#carousel img").at(index);
      if (image) image.scrollIntoView();
    }
  }

  const closeDialog = () => {
    if (!document.startViewTransition) dialog.close();
    else document.startViewTransition(async () => dialog.close());
  };

  const openDialog = (index: number) => {
    if (!document.startViewTransition) {
      dialog.openDialog({ photos, closeDialog });
    } else handleTransition(index);
  };

  return (
    <>
      <section className="banner">{banner}</section>
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
