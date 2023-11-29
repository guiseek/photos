import { album as photos } from "./data/album";
import { Carousel, Banner } from "./elements";

export const app = () => {
  const carousel = new Carousel();
  const banner = new Banner({
    poster: "./main.jpg",
    src: "./main.mp4",
    preload: "auto",
    width: 935,
  });

  return (
    <>
      <div className="banner">{banner}</div>
      <section>
        <div className="imageGallery">
          {photos.map((photo, index) => (
            <button onclick={() => carousel.select({ photos, index })}>
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

        {carousel}
      </section>
    </>
  );
};
