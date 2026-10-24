(() => {
  const carousel = document.querySelector('[data-product-carousel]');
  if (!carousel) return;

  const image = carousel.querySelector('[data-product-image]');
  const description = carousel.querySelector('[data-product-description]');
  const link = carousel.querySelector('[data-product-link]');
  const status = carousel.querySelector('[data-product-status]');
  const controls = carousel.querySelector('[data-product-controls]');
  const previous = carousel.querySelector('[data-carousel-previous]');
  const next = carousel.querySelector('[data-carousel-next]');
  const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
  if (!image || !description || !link || !status || !controls || !previous || !next || dots.length !== 3) return;

  const designs = [
    {
      name: 'Mountain',
      image: 'assets/mountain-mousepad.png',
      alt: 'Angled view of the Dot2. Mountain mousepad, showing its black surface, white mountain line design and stitched edges.',
      description: 'A mountain landscape in black and white. Space for your keyboard and mouse. An understated finishing touch for the place you make things happen.',
      url: 'https://www.amazon.co.uk/dp/B0HB7JHK9S'
    },
    {
      name: 'Pink Cat',
      image: 'assets/pink-cat-mousepad.png',
      alt: 'Angled view of the Dot2. Pink Cat mousepad, with a wide-eyed cat peeking over a pink background and stitched edges.',
      description: 'A playful pink backdrop. A curious little cat. Space for your keyboard and mouse, with a little extra personality for the place you make things happen.',
      url: 'https://www.amazon.co.uk/dp/B0HB7FL3H1'
    },
    {
      name: 'Greek God',
      image: 'assets/greek-god-mousepad.png',
      alt: 'Angled view of the Dot2. Greek God mousepad, with a white-haired figure, blue sword and lightning against a red and black background.',
      description: 'A bold Greek God design in red, black and blue. Space for your keyboard and mouse. A striking finishing touch for the place you make things happen.',
      url: 'https://www.amazon.co.uk/dp/B0HB6W23HJ'
    }
  ];
  let current = 0;

  function show(index) {
    current = (index + designs.length) % designs.length;
    const design = designs[current];
    image.src = design.image;
    image.alt = design.alt;
    description.textContent = design.description;
    link.href = design.url;
    link.setAttribute('aria-label', `Shop the ${design.name} mousepad on Amazon`);
    status.textContent = `${design.name} · ${current + 1} / ${designs.length}`;
    dots.forEach(dot => {
      const index = Number(dot.dataset.index);
      dot.setAttribute('aria-pressed', String(index === current));
      dot.setAttribute('aria-label', `Show ${designs[index].name} design`);
    });
  }

  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.index))));
  controls.addEventListener('keydown', event => {
    const destinations = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: designs.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    show(destinations[event.key]);
  });

  show(current);
  controls.hidden = false;
})();
