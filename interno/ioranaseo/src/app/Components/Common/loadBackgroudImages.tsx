export default function loadBackgroudImages() {
  let backgroudImages = document.querySelectorAll("[data-background]");

  if (backgroudImages.length > 0) {
    backgroudImages.forEach((element) => {
      let image = (element as HTMLElement).dataset.background;
      (element as HTMLElement).style.backgroundImage = `url('${image}')`;
    });
  }
}
