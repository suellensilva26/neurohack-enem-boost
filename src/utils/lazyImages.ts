// Global lazy loading for images via IntersectionObserver and attributes
(function initLazyImages() {
  const setAttrs = (img: HTMLImageElement) => {
    try {
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
      if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
    } catch {}
  };

  const upgradeSrc = (img: HTMLImageElement) => {
    const dataSrc = img.getAttribute("data-src");
    const dataSrcSet = img.getAttribute("data-srcset");
    if (dataSrc) img.src = dataSrc;
    if (dataSrcSet) img.srcset = dataSrcSet;
    img.removeAttribute("data-src");
    img.removeAttribute("data-srcset");
  };

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        upgradeSrc(img);
        io.unobserve(img);
      }
    }
  }, {
    rootMargin: "100px",
    threshold: 0.1,
  });

  const scan = () => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
    imgs.forEach((img) => {
      setAttrs(img);
      if (img.hasAttribute("data-src") || img.hasAttribute("data-srcset")) {
        io.observe(img);
      }
    });
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    scan();
  } else {
    document.addEventListener("DOMContentLoaded", scan);
  }
})();