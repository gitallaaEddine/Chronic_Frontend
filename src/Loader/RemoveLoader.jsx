export function removeLoader() {
  const loader = document.getElementById("global-loader");
  if (loader) {
    loader.style.transition = "opacity 0.4s ease";
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 400);
  }
}
