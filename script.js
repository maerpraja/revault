const STORAGE_KEY = "revault_professional_final_v3";

const assets = {
  Pakaian: "assets/clothes.svg",
  Elektronik: "assets/recycle.svg",
  Buku: "assets/books.svg",
  Kardus: "assets/package.svg",
  Furniture: "assets/package.svg",
  Lainnya: "assets/recycle.svg"
};

const themes = {
  Pakaian: "green",
  Elektronik: "purple",
  Buku: "yellow",
  Kardus: "blue",
  Furniture: "orange",
  Lainnya: "gray"
};

const defaultProducts = [
  {
    id: 1,
    name: "Pakaian Layak Pakai",
    category: "Pakaian",
    condition: "Sangat Baik",
    location: "Malang",
    description:
      "Pakaian bersih dan masih sangat layak digunakan oleh pemilik berikutnya.",
    asset: assets.Pakaian,
    theme: "green"
  },
  {
    id: 2,
    name: "Koleksi Buku Bekas",
    category: "Buku",
    condition: "Baik",
    location: "Malang",
    description:
      "Kumpulan buku bacaan yang masih lengkap dan nyaman untuk dibaca.",
    asset: assets.Buku,
    theme: "yellow"
  },
  {
    id: 3,
    name: "Kardus Bekas Packing",
    category: "Kardus",
    condition: "Baik",
    location: "Malang",
    description:
      "Kardus masih kuat dan dapat digunakan kembali untuk packing atau penyimpanan.",
    asset: assets.Kardus,
    theme: "blue"
  },
  {
    id: 4,
    name: "Keyboard Komputer",
    category: "Elektronik",
    condition: "Baik",
    location: "Batu",
    description:
      "Keyboard kabel yang masih berfungsi normal dan dapat digunakan kembali.",
    asset: assets.Elektronik,
    theme: "purple"
  },
  {
    id: 5,
    name: "Kursi Belajar",
    category: "Furniture",
    condition: "Cukup",
    location: "Malang",
    description:
      "Kursi belajar masih kokoh dan dapat digunakan dengan baik.",
    asset: assets.Furniture,
    theme: "orange"
  },
  {
    id: 6,
    name: "Tas Sekolah",
    category: "Lainnya",
    condition: "Baik",
    location: "Malang",
    description:
      "Tas sekolah masih bersih dan seluruh resleting berfungsi dengan baik.",
    asset: assets.Lainnya,
    theme: "gray"
  }
];

let products = loadProducts();

let heroIndex = 0;
let heroTimer = null;

let toastTimer = null;

let currentModalProduct = null;

let processActiveStep = 0;

let processTrigger = null;
let processTimeline = null;

let processNavigationLocked = false;
let navNavigationLocked = false;

const PROCESS_BREAKPOINT = 1050;

const enhancedSelects = new Map();

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];

const navbar = $("#navbar");

const pageProgress =
  $("#pageProgress");

const cursorGlow =
  $("#cursorGlow");

const heroStage =
  $("#heroStage");

const featuredCard =
  $("#featuredCard");

const featuredAsset =
  $("#featuredAsset");

const featuredCategory =
  $("#featuredCategory");

const featuredLocation =
  $("#featuredLocation");

const featuredTitle =
  $("#featuredTitle");

const featuredCondition =
  $("#featuredCondition");

const featuredCount =
  $("#featuredCount");

const featuredDetail =
  $("#featuredDetail");

const floatingAvailable =
  $("#floatingAvailable");

const sliderDots =
  $("#sliderDots");

const heroPrev =
  $("#heroPrev");

const heroNext =
  $("#heroNext");

const productGrid =
  $("#productGrid");

const searchInput =
  $("#searchInput");

const categoryFilter =
  $("#categoryFilter");

const emptyState =
  $("#emptyState");

const totalProducts =
  $("#totalProducts");

const totalCategories =
  $("#totalCategories");

const postingForm =
  $("#postingForm");

const namaBarang =
  $("#namaBarang");

const kategoriForm =
  $("#kategoriForm");

const lokasi =
  $("#lokasi");

const kondisi =
  $("#kondisi");

const deskripsi =
  $("#deskripsi");

const descriptionCount =
  $("#descriptionCount");

const formGlow =
  $("#formGlow");

const detailModal =
  $("#detailModal");

const modalClose =
  $("#modalClose");

const modalVisual =
  $("#modalVisual");

const modalAsset =
  $("#modalAsset");

const modalCategory =
  $("#modalCategory");

const modalTitle =
  $("#modalTitle");

const modalCondition =
  $("#modalCondition");

const modalLocation =
  $("#modalLocation");

const modalDescription =
  $("#modalDescription");

const requestButton =
  $("#requestButton");

const toast =
  $("#toast");

const toastTitle =
  $("#toastTitle");

const toastMessage =
  $("#toastMessage");

const menuToggle =
  $("#menuToggle");

const mobileNav =
  $("#mobileNav");

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

const coarsePointer =
  window.matchMedia(
    "(pointer: coarse)"
  ).matches;

if (
  typeof gsap !== "undefined" &&
  typeof ScrollTrigger !== "undefined"
) {
  gsap.registerPlugin(
    ScrollTrigger
  );
}


/* =========================================================
   STORAGE
========================================================= */

function loadProducts() {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!saved) {
      return [
        ...defaultProducts
      ];
    }

    const parsed =
      JSON.parse(saved);

    return Array.isArray(
      parsed
    )
      ? parsed
      : [
          ...defaultProducts
        ];
  } catch {
    return [
      ...defaultProducts
    ];
  }
}

function saveProducts() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      products
    )
  );
}

function escapeHTML(value) {
  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}


/* =========================================================
   CUSTOM SELECT
========================================================= */

function setSelectOpen(
  wrapper,
  open
) {
  if (!wrapper) {
    return;
  }

  wrapper.classList.toggle(
    "open",
    open
  );

  const trigger =
    wrapper.querySelector(
      ".select-trigger"
    );

  trigger?.setAttribute(
    "aria-expanded",
    String(open)
  );

  const formGroup =
    wrapper.closest(
      ".form-group"
    );

  const formRow =
    wrapper.closest(
      ".form-row"
    );

  const toolbar =
    wrapper.closest(
      ".toolbar"
    );

  formGroup?.classList.toggle(
    "dropdown-open",
    open
  );

  formRow?.classList.toggle(
    "dropdown-open",
    open
  );

  toolbar?.classList.toggle(
    "dropdown-open",
    open
  );
}

function closeAllSelects(
  except = null
) {
  document
    .querySelectorAll(
      ".select-enhanced.open"
    )
    .forEach(
      (wrapper) => {
        if (
          wrapper ===
          except
        ) {
          return;
        }

        setSelectOpen(
          wrapper,
          false
        );
      }
    );
}

function createEnhancedSelect(
  select
) {
  if (
    !select ||
    enhancedSelects.has(
      select
    )
  ) {
    return;
  }

  /*
    Validasi form ditangani JS.
    Ini mencegah browser mencoba
    fokus ke native select yang disembunyikan.
  */

  if (select.required) {
    select.required =
      false;
  }

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.className =
    "select-enhanced";

  const trigger =
    document.createElement(
      "button"
    );

  trigger.type =
    "button";

  trigger.className =
    "select-trigger";

  trigger.setAttribute(
    "aria-haspopup",
    "listbox"
  );

  trigger.setAttribute(
    "aria-expanded",
    "false"
  );

  const label =
    document.createElement(
      "span"
    );

  label.className =
    "select-label";

  const chevron =
    document.createElement(
      "span"
    );

  chevron.className =
    "select-chevron";

  chevron.textContent =
    "⌄";

  const menu =
    document.createElement(
      "div"
    );

  menu.className =
    "select-menu";

  menu.setAttribute(
    "role",
    "listbox"
  );

  trigger.append(
    label,
    chevron
  );

  select.parentNode.insertBefore(
    wrapper,
    select.nextSibling
  );

  wrapper.append(
    trigger,
    menu
  );

  const state = {
    wrapper,
    trigger,
    label,
    menu
  };

  enhancedSelects.set(
    select,
    state
  );

  trigger.addEventListener(
    "click",
    () => {
      const isOpen =
        wrapper.classList.contains(
          "open"
        );

      closeAllSelects(
        wrapper
      );

      setSelectOpen(
        wrapper,
        !isOpen
      );
    }
  );

  menu.addEventListener(
    "click",
    (event) => {
      const optionButton =
        event.target.closest(
          ".select-option"
        );

      if (!optionButton) {
        return;
      }

      select.value =
        optionButton.dataset.value;

      select.dispatchEvent(
        new Event(
          "change",
          {
            bubbles: true
          }
        )
      );

      refreshEnhancedSelect(
        select
      );

      setSelectOpen(
        wrapper,
        false
      );
    }
  );

  select.addEventListener(
    "change",
    () => {
      refreshEnhancedSelect(
        select
      );
    }
  );

  refreshEnhancedSelect(
    select
  );
}

function refreshEnhancedSelect(
  select
) {
  const state =
    enhancedSelects.get(
      select
    );

  if (!state) {
    return;
  }

  const options = [
    ...select.options
  ];

  state.menu.innerHTML =
    "";

  options.forEach(
    (option) => {
      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "select-option";

      button.dataset.value =
        option.value;

      button.textContent =
        option.textContent;

      if (
        option.value ===
        select.value
      ) {
        button.classList.add(
          "selected"
        );
      }

      state.menu.appendChild(
        button
      );
    }
  );

  const selectedOption =
    options.find(
      (option) =>
        option.value ===
        select.value
    ) ||
    options[0];

  state.label.textContent =
    selectedOption
      ? selectedOption.textContent
      : "Pilih";
}

function initCustomSelects() {
  $$(
    ".custom-select-source"
  ).forEach(
    createEnhancedSelect
  );

  document.addEventListener(
    "click",
    (event) => {
      if (
        event.target.closest(
          ".select-enhanced"
        )
      ) {
        return;
      }

      closeAllSelects();
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
        "Escape"
      ) {
        closeAllSelects();
      }
    }
  );
}


/* =========================================================
   HERO
========================================================= */

function renderSliderDots() {
  sliderDots.innerHTML =
    "";

  products.forEach(
    (_, index) => {
      const dot =
        document.createElement(
          "button"
        );

      dot.type =
        "button";

      dot.className =
        "slider-dot";

      dot.setAttribute(
        "aria-label",
        `Barang ${index + 1}`
      );

      if (
        index ===
        heroIndex
      ) {
        dot.classList.add(
          "active"
        );
      }

      dot.addEventListener(
        "click",
        () => {
          heroIndex =
            index;

          updateHero();

          restartHeroSlider();
        }
      );

      sliderDots.appendChild(
        dot
      );
    }
  );
}

function updateHero(
  animate = true
) {
  if (!products.length) {
    return;
  }

  if (
    heroIndex >=
    products.length
  ) {
    heroIndex =
      0;
  }

  const product =
    products[
      heroIndex
    ];

  const apply = () => {
    featuredAsset.src =
      product.asset;

    featuredCategory.textContent =
      product.category;

    featuredLocation.textContent =
      product.location;

    featuredTitle.textContent =
      product.name;

    featuredCondition.textContent =
      product.condition;

    featuredCount.textContent =
      `${String(
        heroIndex + 1
      ).padStart(
        2,
        "0"
      )} / ${String(
        products.length
      ).padStart(
        2,
        "0"
      )}`;

    featuredCard.dataset.id =
      product.id;

    renderSliderDots();
  };

  if (
    !animate ||
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {
    apply();

    return;
  }

  gsap.killTweensOf([
    featuredAsset,
    featuredCategory,
    featuredLocation,
    featuredTitle,
    featuredCondition
  ]);

  gsap.to(
    [
      featuredAsset,
      featuredCategory,
      featuredLocation,
      featuredTitle,
      featuredCondition
    ],
    {
      autoAlpha: 0,

      y: 10,

      duration: .15,

      stagger: .012,

      overwrite: true,

      onComplete() {
        apply();

        gsap.fromTo(
          [
            featuredAsset,
            featuredCategory,
            featuredLocation,
            featuredTitle,
            featuredCondition
          ],
          {
            autoAlpha: 0,

            y: 14
          },
          {
            autoAlpha: 1,

            y: 0,

            stagger: .025,

            duration: .34,

            ease:
              "power3.out",

            overwrite: true
          }
        );
      }
    }
  );
}

function nextHero() {
  if (
    products.length <=
    1
  ) {
    return;
  }

  heroIndex =
    (
      heroIndex +
      1
    ) %
    products.length;

  updateHero();
}

function previousHero() {
  if (
    products.length <=
    1
  ) {
    return;
  }

  heroIndex =
    (
      heroIndex -
      1 +
      products.length
    ) %
    products.length;

  updateHero();
}

function restartHeroSlider() {
  clearInterval(
    heroTimer
  );

  if (
    products.length <=
    1
  ) {
    return;
  }

  heroTimer =
    setInterval(
      nextHero,
      4700
    );
}


/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts(
  list = products
) {
  productGrid.innerHTML =
    "";

  if (!list.length) {
    emptyState.classList.remove(
      "hidden"
    );

    return;
  }

  emptyState.classList.add(
    "hidden"
  );

  list.forEach(
    (product) => {
      const card =
        document.createElement(
          "article"
        );

      card.className =
        "product-card";

      card.innerHTML = `
        <div class="product-card-inner">

          <span class="product-glow"></span>

          <div class="product-image theme-${escapeHTML(product.theme)}">

            <span class="product-status">
              Tersedia
            </span>

            <img
              src="${escapeHTML(product.asset)}"
              alt=""
            >

          </div>

          <div class="product-content">

            <div class="product-category">
              ${escapeHTML(product.category)}
            </div>

            <h3>
              ${escapeHTML(product.name)}
            </h3>

            <div class="product-meta">

              <span>
                ◉ ${escapeHTML(product.condition)}
              </span>

              <span>
                ⌖ ${escapeHTML(product.location)}
              </span>

            </div>

            <button
              type="button"
              class="product-detail"
              data-id="${product.id}"
            >

              Lihat Detail

              <span>
                ↗
              </span>

            </button>

          </div>

        </div>
      `;

      productGrid.appendChild(
        card
      );
    }
  );

  initProductHover();
}

function renderCategoryFilter() {
  const previousValue =
    categoryFilter.value ||
    "semua";

  const categories = [
    ...new Set(
      products
        .map(
          (product) =>
            product.category
        )
        .filter(Boolean)
    )
  ];

  categoryFilter.innerHTML =
    `
      <option value="semua">
        Semua kategori
      </option>
    `;

  categories.forEach(
    (category) => {
      const option =
        document.createElement(
          "option"
        );

      option.value =
        category;

      option.textContent =
        category;

      categoryFilter.appendChild(
        option
      );
    }
  );

  categoryFilter.value =
    previousValue === "semua" ||
    categories.includes(
      previousValue
    )
      ? previousValue
      : "semua";

  refreshEnhancedSelect(
    categoryFilter
  );
}

function filterProducts() {
  const query =
    searchInput.value
      .trim()
      .toLowerCase();

  const selectedCategory =
    categoryFilter.value ||
    "semua";

  const filteredProducts =
    products.filter(
      (product) => {
        const searchableText = [
          product.name,
          product.category,
          product.location,
          product.condition,
          product.description
        ]
          .map(
            (value) =>
              String(
                value || ""
              ).toLowerCase()
          )
          .join(" ");

        const matchesSearch =
          query === "" ||
          searchableText.includes(
            query
          );

        const matchesCategory =
          selectedCategory ===
            "semua" ||
          product.category ===
            selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  renderProducts(
    filteredProducts
  );
}


/* =========================================================
   PRODUCT 3D HOVER
========================================================= */

function initProductHover() {
  if (
    coarsePointer ||
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {
    return;
  }

  $$(
    ".product-card"
  ).forEach(
    (card) => {
      const inner =
        card.querySelector(
          ".product-card-inner"
        );

      const image =
        card.querySelector(
          ".product-image img"
        );

      const glow =
        card.querySelector(
          ".product-glow"
        );

      if (
        card.dataset.motionReady ===
        "true"
      ) {
        return;
      }

      card.dataset.motionReady =
        "true";

      card.addEventListener(
        "mousemove",
        (event) => {
          const rect =
            card.getBoundingClientRect();

          const px =
            (
              event.clientX -
              rect.left
            ) /
            rect.width;

          const py =
            (
              event.clientY -
              rect.top
            ) /
            rect.height;

          const x =
            px - .5;

          const y =
            py - .5;

          gsap.to(
            inner,
            {
              rotateY:
                x * 10,

              rotateX:
                y * -10,

              duration:
                .24,

              ease:
                "power2.out",

              transformPerspective:
                900,

              overwrite:
                true
            }
          );

          gsap.to(
            image,
            {
              x:
                x * 16,

              y:
                y * 12,

              rotation:
                x * 4,

              scale:
                1.08,

              duration:
                .28,

              ease:
                "power2.out",

              overwrite:
                true
            }
          );

          gsap.to(
            glow,
            {
              x:
                px *
                rect.width,

              y:
                py *
                rect.height,

              autoAlpha:
                1,

              duration:
                .18,

              ease:
                "power2.out",

              overwrite:
                true
            }
          );
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          gsap.to(
            inner,
            {
              rotateX:
                0,

              rotateY:
                0,

              duration:
                .62,

              ease:
                "elastic.out(1,.55)",

              overwrite:
                true
            }
          );

          gsap.to(
            image,
            {
              x:
                0,

              y:
                0,

              rotation:
                0,

              scale:
                1,

              duration:
                .58,

              ease:
                "power4.out",

              overwrite:
                true
            }
          );

          gsap.to(
            glow,
            {
              autoAlpha:
                0,

              duration:
                .22,

              overwrite:
                true
            }
          );
        }
      );
    }
  );
}


/* =========================================================
   STATS
========================================================= */

function updateStats() {
  const categoryCount =
    new Set(
      products.map(
        (product) =>
          product.category
      )
    ).size;

  totalProducts.dataset.target =
    products.length;

  totalCategories.dataset.target =
    categoryCount;

  floatingAvailable.textContent =
    products.length;
}

function animateCounters() {
  if (
    typeof gsap ===
      "undefined" ||
    typeof ScrollTrigger ===
      "undefined" ||
    reducedMotion
  ) {
    $$(
      ".counter"
    ).forEach(
      (counter) => {
        counter.textContent =
          `${counter.dataset.target}${counter.dataset.suffix || ""}`;
      }
    );

    return;
  }

  $$(
    ".counter"
  ).forEach(
    (counter) => {
      const target =
        Number(
          counter.dataset.target ||
          0
        );

      const suffix =
        counter.dataset.suffix ||
        "";

      const data = {
        value: 0
      };

      gsap.to(
        data,
        {
          value:
            target,

          duration:
            1.3,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              counter,

            start:
              "top 90%",

            once:
              true
          },

          onUpdate() {
            counter.textContent =
              `${Math.round(
                data.value
              )}${suffix}`;
          }
        }
      );
    }
  );
}


/* =========================================================
   HERO INTRO
========================================================= */

function initHeroIntro() {
  if (
    typeof gsap ===
      "undefined" ||
    reducedMotion
  ) {
    return;
  }

  const tl =
    gsap.timeline({
      defaults: {
        ease:
          "power4.out"
      }
    });

  tl
    .from(
      ".hero-badge",
      {
        autoAlpha:
          0,

        y:
          20,

        duration:
          .5
      }
    )

    .from(
      ".title-line",
      {
        yPercent:
          115,

        duration:
          .9,

        stagger:
          .1
      },
      "-=.2"
    )

    .from(
      ".hero-description",
      {
        autoAlpha:
          0,

        y:
          18,

        duration:
          .5
      },
      "-=.42"
    )

    .from(
      ".hero-actions",
      {
        autoAlpha:
          0,

        y:
          18,

        duration:
          .45
      },
      "-=.35"
    )

    .from(
      ".hero-meta",
      {
        autoAlpha:
          0,

        y:
          14,

        duration:
          .4
      },
      "-=.3"
    )

    .from(
      ".featured-shell",
      {
        autoAlpha:
          0,

        y:
          45,

        scale:
          .93,

        rotation:
          5,

        duration:
          .85
      },
      "-=.65"
    )

    .from(
      ".floating-card",
      {
        autoAlpha:
          0,

        scale:
          .85,

        duration:
          .45,

        stagger:
          .08
      },
      "-=.45"
    );
}


/* =========================================================
   HERO TILT
========================================================= */

function initHeroTilt() {
  if (
    !heroStage ||
    coarsePointer ||
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {
    return;
  }

  heroStage.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        heroStage.getBoundingClientRect();

      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width -
        .5;

      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height -
        .5;

      gsap.to(
        featuredCard,
        {
          rotateY:
            x * 5,

          rotateX:
            y * -5,

          x:
            x * 8,

          y:
            y * 8,

          duration:
            .45,

          ease:
            "power3.out",

          transformPerspective:
            1100,

          overwrite:
            true
        }
      );

      gsap.to(
        ".floating-top",
        {
          x:
            x * -18,

          y:
            y * -14,

          duration:
            .6,

          ease:
            "power3.out",

          overwrite:
            "auto"
        }
      );

      gsap.to(
        ".floating-bottom",
        {
          x:
            x * 18,

          y:
            y * 14,

          duration:
            .6,

          ease:
            "power3.out",

          overwrite:
            "auto"
        }
      );
    }
  );

  heroStage.addEventListener(
    "mouseleave",
    () => {
      gsap.to(
        featuredCard,
        {
          rotateX:
            0,

          rotateY:
            0,

          x:
            0,

          y:
            0,

          duration:
            .65,

          ease:
            "power4.out",

          overwrite:
            true
        }
      );

      gsap.to(
        ".floating-card",
        {
          x:
            0,

          y:
            0,

          duration:
            .65,

          ease:
            "power4.out",

          overwrite:
            "auto"
        }
      );
    }
  );
}


/* =========================================================
   CARA KERJA DESKTOP
========================================================= */

function initProcessStory() {
  if (
    window.innerWidth <= 760 ||
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {
    return;
  }

  const section =
    $(".process-section");

  const slides =
    $$(".process-slide");

  const current =
    $("#stepCurrent");

  const progressBar =
    $("#processProgressBar");

  if (
    !section ||
    slides.length !== 3 ||
    !current ||
    !progressBar
  ) {
    return;
  }

  processActiveStep = 0;

  gsap.set(
    slides,
    {
      autoAlpha: 0,
      y: 45,
      scale: .975,
      pointerEvents: "none"
    }
  );

  gsap.set(
    slides[0],
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      pointerEvents: "auto"
    }
  );

  function showStep(
  index,
  animate = true
) {
  index =
    Math.max(
      0,
      Math.min(
        slides.length - 1,
        index
      )
    );

  const oldIndex =
    processActiveStep;

  const oldSlide =
    slides[oldIndex];

  const newSlide =
    slides[index];

  /*
    PENTING:
    hentikan animasi lama terlebih dahulu.

    Ini mencegah card 03 muncul kembali
    setelah kita sudah reset ke 01.
  */
  gsap.killTweensOf(
    slides
  );

  gsap.killTweensOf(
    progressBar
  );

  processActiveStep =
    index;

  current.textContent =
    String(index + 1)
      .padStart(
        2,
        "0"
      );

  const width =
    `${((index + 1) / 3) * 100}%`;


  /*
    Kalau tidak dianimasikan,
    paksa kondisi seluruh card.
  */
  if (
    !animate ||
    reducedMotion
  ) {
    slides.forEach(
      (
        slide,
        slideIndex
      ) => {
        const active =
          slideIndex === index;

        gsap.set(
          slide,
          {
            autoAlpha:
              active
                ? 1
                : 0,

            y:
              active
                ? 0
                : 45,

            scale:
              active
                ? 1
                : .975,

            pointerEvents:
              active
                ? "auto"
                : "none"
          }
        );
      }
    );

    gsap.set(
      progressBar,
      {
        width
      }
    );

    return;
  }


  /*
    Walaupun step yang diminta sama,
    tetap normalisasi semua slide.

    Ini penting kalau sebelumnya
    ada tween yang tertinggal.
  */
  if (
    index === oldIndex
  ) {
    slides.forEach(
      (
        slide,
        slideIndex
      ) => {
        const active =
          slideIndex === index;

        gsap.set(
          slide,
          {
            autoAlpha:
              active
                ? 1
                : 0,

            y:
              active
                ? 0
                : 45,

            scale:
              active
                ? 1
                : .975,

            pointerEvents:
              active
                ? "auto"
                : "none"
          }
        );
      }
    );

    gsap.to(
      progressBar,
      {
        width,

        duration:
          .25,

        ease:
          "power2.out",

        overwrite:
          true
      }
    );

    return;
  }


  const direction =
    index > oldIndex
      ? 1
      : -1;


  /*
    Sebelum animasi dimulai,
    sembunyikan semua card selain
    old dan new slide.
  */
  slides.forEach(
    (
      slide,
      slideIndex
    ) => {
      if (
        slideIndex !== oldIndex &&
        slideIndex !== index
      ) {
        gsap.set(
          slide,
          {
            autoAlpha:
              0,

            y:
              45,

            scale:
              .975,

            pointerEvents:
              "none"
          }
        );
      }
    }
  );


  gsap.set(
    newSlide,
    {
      autoAlpha:
        0,

      y:
        direction > 0
          ? 45
          : -35,

      scale:
        .975,

      pointerEvents:
        "none"
    }
  );


  gsap.to(
    progressBar,
    {
      width,

      duration:
        .28,

      ease:
        "power2.out",

      overwrite:
        true
    }
  );


  gsap.timeline({
    defaults: {
      overwrite:
        true
    }
  })

    .to(
      oldSlide,
      {
        autoAlpha:
          0,

        y:
          direction > 0
            ? -30
            : 30,

        scale:
          .985,

        duration:
          .24,

        ease:
          "power2.inOut",

        pointerEvents:
          "none"
      }
    )

    .to(
      newSlide,
      {
        autoAlpha:
          1,

        y:
          0,

        scale:
          1,

        duration:
          .4,

        ease:
          "power4.out",

        pointerEvents:
          "auto"
      },
      "-=.07"
    );
}
  window.__revaultForceProcessStep =
    (index) => {
      showStep(
        index,
        false
      );
    };

  processTrigger =
  ScrollTrigger.create({
    trigger: section,

    start: "top top",

    end: "bottom bottom",

    invalidateOnRefresh: true,

    onEnter() {
  if (
    processNavigationLocked
  ) {
    return;
  }

  /*
    Saat masuk dari atas,
    SELALU mulai dari 01.
  */

  showStep(
    0,
    false
  );
},

onLeave() {
  /*
    Keluar ke bawah:
    reset state untuk kunjungan berikutnya.
  */

  showStep(
    0,
    false
  );
},

onLeaveBack() {
  /*
    Keluar ke atas:
    reset juga.
  */

  showStep(
    0,
    false
  );
},


    onLeave() {
      /*
        Begitu pengguna sudah keluar
        dari Cara Kerja ke section bawah,
        state internal langsung kembali 01.
      */

      showStep(
        0,
        false
      );
    },

    onLeaveBack() {
      /*
        Begitu keluar dari Cara Kerja
        menuju section atas,
        reset juga ke 01.
      */

      showStep(
        0,
        false
      );
    },

    onUpdate(self) {
      if (
        processNavigationLocked
      ) {
        return;
      }

      const progress =
        self.progress;

      let nextStep = 0;

      if (
        progress >= .67
      ) {
        nextStep = 2;
      } else if (
        progress >= .33
      ) {
        nextStep = 1;
      }

      if (
        nextStep !==
        processActiveStep
      ) {
        showStep(
          nextStep,
          true
        );
      }
    }
  });

  showStep(
    0,
    false
  );
}

function resetProcessToStart() {
  if (
    window.innerWidth <= PROCESS_BREAKPOINT
  ) {
    if (
      typeof window.__revaultSetMobileProcessStep ===
      "function"
    ) {
      window.__revaultSetMobileProcessStep(
        0
      );
    }

    return;
  }


  /*
    Desktop:
    matikan seluruh animasi slide lama.
  */

  if (
    typeof gsap !==
    "undefined"
  ) {
    gsap.killTweensOf(
      ".process-slide"
    );

    gsap.killTweensOf(
      "#processProgressBar"
    );
  }


  if (
    typeof window.__revaultForceProcessStep ===
    "function"
  ) {
    window.__revaultForceProcessStep(
      0
    );
  }
}


/* =========================================================
   MOBILE CARA KERJA
========================================================= */

function initMobileProcessCarousel() {
  if (
  window.innerWidth > PROCESS_BREAKPOINT
) {
  return;
}

  const stage =
    $(".process-stage");

  const slides =
    $$(".process-slide");

  const prev =
    $("#processMobilePrev");

  const next =
    $("#processMobileNext");

  const dots =
    $$("#processMobileDots span");

  if (
    !stage ||
    slides.length !== 3 ||
    !prev ||
    !next
  ) {
    return;
  }

  let index = 0;

  let startX = 0;

  let startY = 0;

  let animating = false;


  function updateControls() {
    prev.disabled =
      index === 0;

    next.disabled =
      index ===
      slides.length - 1;

    dots.forEach(
      (dot, dotIndex) => {
        dot.classList.toggle(
          "active",
          dotIndex === index
        );
      }
    );
  }


  function forceStep(
    newIndex
  ) {
    index =
      Math.max(
        0,
        Math.min(
          slides.length - 1,
          newIndex
        )
      );

    slides.forEach(
      (
        slide,
        slideIndex
      ) => {
        const active =
          slideIndex ===
          index;

        slide.classList.toggle(
          "mobile-active",
          active
        );

        slide.classList.toggle(
          "mobile-left",
          slideIndex < index
        );

        slide.classList.toggle(
          "mobile-right",
          slideIndex > index
        );

        gsap.set(
          slide,
          {
            autoAlpha:
              active ? 1 : 0,

            xPercent:
              active
                ? 0
                : slideIndex < index
                  ? -15
                  : 15,

            scale:
              active
                ? 1
                : .98,

            pointerEvents:
              active
                ? "auto"
                : "none"
          }
        );
      }
    );

    updateControls();
  }


  function goTo(
    newIndex
  ) {
    if (
      animating ||
      newIndex < 0 ||
      newIndex >= slides.length ||
      newIndex === index
    ) {
      return;
    }

    animating = true;

    const oldIndex =
      index;

    const oldSlide =
      slides[oldIndex];

    const newSlide =
      slides[newIndex];

    const direction =
      newIndex > oldIndex
        ? 1
        : -1;

    index =
      newIndex;

    slides.forEach(
      (
        slide,
        slideIndex
      ) => {
        slide.classList.toggle(
          "mobile-active",
          slideIndex === index
        );

        slide.classList.toggle(
          "mobile-left",
          slideIndex < index
        );

        slide.classList.toggle(
          "mobile-right",
          slideIndex > index
        );
      }
    );

    gsap.killTweensOf(
      slides
    );

    gsap.set(
      newSlide,
      {
        autoAlpha: 0,

        xPercent:
          direction > 0
            ? 20
            : -20,

        scale: .98,

        pointerEvents: "none"
      }
    );

    gsap.timeline({
      defaults: {
        overwrite: true
      },

      onComplete() {
        gsap.set(
          oldSlide,
          {
            autoAlpha: 0,
            pointerEvents: "none"
          }
        );

        gsap.set(
          newSlide,
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            pointerEvents: "auto"
          }
        );

        animating = false;
      }
    })

      .to(
        oldSlide,
        {
          autoAlpha: 0,

          xPercent:
            direction > 0
              ? -20
              : 20,

          scale: .98,

          duration: .22,

          ease: "power2.inOut"
        }
      )

      .to(
        newSlide,
        {
          autoAlpha: 1,

          xPercent: 0,

          scale: 1,

          duration: .38,

          ease: "power4.out"
        },
        "-=.03"
      );

    updateControls();
  }


  prev.addEventListener(
    "click",
    () => {
      goTo(
        index - 1
      );
    }
  );


  next.addEventListener(
    "click",
    () => {
      goTo(
        index + 1
      );
    }
  );


  stage.addEventListener(
    "touchstart",
    (event) => {
      const touch =
        event.changedTouches[0];

      startX =
        touch.clientX;

      startY =
        touch.clientY;
    },
    {
      passive: true
    }
  );


  stage.addEventListener(
    "touchend",
    (event) => {
      const touch =
        event.changedTouches[0];

      const deltaX =
        touch.clientX -
        startX;

      const deltaY =
        touch.clientY -
        startY;

      if (
        Math.abs(deltaX) < 45
      ) {
        return;
      }

      if (
        Math.abs(deltaX) <=
        Math.abs(deltaY)
      ) {
        return;
      }

      if (
        deltaX < 0
      ) {
        goTo(
          index + 1
        );
      } else {
        goTo(
          index - 1
        );
      }
    },
    {
      passive: true
    }
  );


  window.__revaultSetMobileProcessStep =
    forceStep;


  forceStep(0);
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {
  if (
    typeof gsap ===
      "undefined" ||
    typeof ScrollTrigger ===
      "undefined" ||
    reducedMotion
  ) {
    return;
  }

  gsap.utils
    .toArray(
      ".reveal"
    )
    .forEach(
      (element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha:
              0,

            y:
              34
          },
          {
            autoAlpha:
              1,

            y:
              0,

            duration:
              .78,

            ease:
              "power4.out",

            scrollTrigger: {
              trigger:
                element,

              start:
                "top 88%",

              once:
                true
            }
          }
        );
      }
    );
}


/* =========================================================
   TICKER
========================================================= */

function initTicker() {
  if (
    typeof gsap ===
      "undefined" ||
    reducedMotion
  ) {
    return;
  }

  gsap.to(
    "#tickerTrack",
    {
      xPercent:
        -50,

      duration:
        22,

      repeat:
        -1,

      ease:
        "none"
    }
  );
}


/* =========================================================
   ORBIT
========================================================= */

function initOrbit() {
  if (
    typeof gsap ===
      "undefined" ||
    reducedMotion
  ) {
    return;
  }

  gsap.to(
    "#orbitSystem",
    {
      rotation:
        360,

      duration:
        34,

      repeat:
        -1,

      ease:
        "none"
    }
  );

  gsap.to(
    ".orbit-item",
    {
      rotation:
        -360,

      duration:
        34,

      repeat:
        -1,

      ease:
        "none"
    }
  );
}


/* =========================================================
   FLOATING HERO
========================================================= */

function initFloatingAnimations() {
  if (
    typeof gsap ===
      "undefined" ||
    reducedMotion
  ) {
    return;
  }

  gsap.to(
    ".floating-top",
    {
      y:
        -10,

      rotation:
        -1,

      repeat:
        -1,

      yoyo:
        true,

      duration:
        2.5,

      ease:
        "sine.inOut"
    }
  );

  gsap.to(
    ".floating-bottom",
    {
      y:
        10,

      rotation:
        1,

      repeat:
        -1,

      yoyo:
        true,

      duration:
        2.8,

      ease:
        "sine.inOut"
    }
  );

  gsap.to(
    ".orbit-small",
    {
      rotation:
        360,

      duration:
        45,

      repeat:
        -1,

      ease:
        "none"
    }
  );
}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {
  if (
    coarsePointer ||
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {
    return;
  }

  $$(
    ".magnetic"
  ).forEach(
    (button) => {
      button.addEventListener(
        "mousemove",
        (event) => {
          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width /
              2;

          const y =
            event.clientY -
            rect.top -
            rect.height /
              2;

          gsap.to(
            button,
            {
              x:
                x * .1,

              y:
                y * .12,

              duration:
                .25,

              ease:
                "power2.out",

              overwrite:
                true
            }
          );
        }
      );

      button.addEventListener(
        "mouseleave",
        () => {
          gsap.to(
            button,
            {
              x:
                0,

              y:
                0,

              duration:
                .55,

              ease:
                "elastic.out(1,.45)",

              overwrite:
                true
            }
          );
        }
      );
    }
  );
}


/* =========================================================
   POSTING FORM MOTION
========================================================= */

function initPostingCardMotion() {
  if (
    !postingForm ||
    coarsePointer ||
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {
    return;
  }

  postingForm.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        postingForm.getBoundingClientRect();

      const px =
        (
          event.clientX -
          rect.left
        ) /
        rect.width;

      const py =
        (
          event.clientY -
          rect.top
        ) /
        rect.height;

      const x =
        px - .5;

      const y =
        py - .5;

      gsap.to(
        postingForm,
        {
          rotateY:
            x * 2.5,

          rotateX:
            y * -2.5,

          y:
            -3,

          transformPerspective:
            1100,

          duration:
            .35,

          ease:
            "power3.out",

          overwrite:
            true
        }
      );

      if (
        formGlow
      ) {
        gsap.to(
          formGlow,
          {
            x:
              px *
              rect.width,

            y:
              py *
              rect.height,

            autoAlpha:
              1,

            duration:
              .25,

            overwrite:
              true
          }
        );
      }
    }
  );

  postingForm.addEventListener(
    "mouseleave",
    () => {
      gsap.to(
        postingForm,
        {
          rotateX:
            0,

          rotateY:
            0,

          y:
            0,

          duration:
            .6,

          ease:
            "power4.out",

          overwrite:
            true
        }
      );

      if (
        formGlow
      ) {
        gsap.to(
          formGlow,
          {
            autoAlpha:
              0,

            duration:
              .25,

            overwrite:
              true
          }
        );
      }
    }
  );
}


/* =========================================================
   NAVIGATION MOTION
========================================================= */

function initNavMotion() {
  const nav =
    $("#desktopNav");

  const links =
    $$(
      ".desktop-nav a[data-nav]"
    );

  const hover =
    $("#navHoverIndicator");

  const activeIndicator =
    $("#navActiveIndicator");

  if (
    !nav ||
    !links.length ||
    !hover ||
    !activeIndicator
  ) {
    return;
  }

  function moveActive(
    link,
    instant = false
  ) {
    if (
      !link ||
      !link.offsetParent
    ) {
      return;
    }

    const x =
      link.offsetLeft +
      (
        link.offsetWidth -
        18
      ) /
      2;

    if (
      typeof gsap ===
      "undefined"
    ) {
      activeIndicator.style.transform =
        `translateX(${x}px)`;

      return;
    }

    gsap.to(
      activeIndicator,
      {
        x,

        width:
          18,

        autoAlpha:
          1,

        duration:
          instant
            ? 0
            : .42,

        ease:
          "power4.out",

        overwrite:
          true
      }
    );
  }

  const initialActive =
    links.find(
      (link) =>
        link.classList.contains(
          "active"
        )
    ) ||
    links[0];

  requestAnimationFrame(
    () => {
      moveActive(
        initialActive,
        true
      );
    }
  );

  if (
    typeof gsap !==
    "undefined"
  ) {
    links.forEach(
      (link) => {
        link.addEventListener(
          "mouseenter",
          () => {
            gsap.to(
              hover,
              {
                x:
                  link.offsetLeft,

                width:
                  link.offsetWidth,

                autoAlpha:
                  1,

                duration:
                  .28,

                ease:
                  "power3.out",

                overwrite:
                  true
              }
            );

            gsap.to(
              link,
              {
                y:
                  -2,

                duration:
                  .25,

                ease:
                  "power2.out",

                overwrite:
                  true
              }
            );
          }
        );

        link.addEventListener(
          "mouseleave",
          () => {
            gsap.to(
              link,
              {
                y:
                  0,

                duration:
                  .35,

                ease:
                  "power3.out",

                overwrite:
                  true
              }
            );
          }
        );
      }
    );

    nav.addEventListener(
      "mouseleave",
      () => {
        gsap.to(
          hover,
          {
            autoAlpha:
              0,

            duration:
              .2,

            overwrite:
              true
          }
        );
      }
    );
  }

  window.addEventListener(
    "resize",
    () => {
      const current =
        links.find(
          (link) =>
            link.classList.contains(
              "active"
            )
        ) ||
        links[0];

      moveActive(
        current,
        true
      );
    }
  );

  window.__revaultMoveActiveNav =
    moveActive;
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initNavigation() {
  const sections =
    $$(
      "[data-section]"
    );

  window.__revaultSetActiveNav =
    (
      sectionName
    ) => {
      const links =
        $$(
          ".desktop-nav a[data-nav]"
        );

      links.forEach(
        (link) => {
          link.classList.toggle(
            "active",
            link.dataset.nav ===
              sectionName
          );
        }
      );

      const activeLink =
        links.find(
          (link) =>
            link.dataset.nav ===
            sectionName
        );

      if (
        activeLink &&
        typeof window.__revaultMoveActiveNav ===
          "function"
      ) {
        window.__revaultMoveActiveNav(
          activeLink
        );
      }
    };

  const updateActiveNavigation =
    () => {
      if (
        navNavigationLocked
      ) {
        return;
      }

      const marker =
        window.innerHeight *
        .34;

      let activeSection =
        sections[0] ||
        null;

      sections.forEach(
        (section) => {
          const rect =
            section.getBoundingClientRect();

          if (
            rect.top <=
            marker
          ) {
            activeSection =
              section;
          }
        }
      );

      if (
        activeSection?.dataset.section
      ) {
        window.__revaultSetActiveNav(
          activeSection.dataset.section
        );
      }
    };

  window.__revaultUpdateActiveNavigation =
    updateActiveNavigation;

  updateActiveNavigation();

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive:
        true
    }
  );

  window.addEventListener(
    "resize",
    updateActiveNavigation
  );

  menuToggle.addEventListener(
    "click",
    () => {
      const open =
        mobileNav.classList.toggle(
          "open"
        );

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );
    }
  );
}


/* =========================================================
   NAVIGATION SCROLL
========================================================= */

function navigateToTarget(
  target,
  href
) {
  if (!target) {
    return;
  }

  mobileNav.classList.remove(
    "open"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );


  const sectionName =
    target.dataset.section;


  const isProcessTarget =
    href === "#cara-kerja";


  /*
    Active navigation langsung
    berpindah ke menu yang diklik.
  */

  navNavigationLocked = true;


  if (
    sectionName &&
    typeof window.__revaultSetActiveNav ===
      "function"
  ) {
    window.__revaultSetActiveNav(
      sectionName
    );
  }


  /*
    HANYA jika tujuan memang Cara Kerja,
    lock step dan mulai dari 01.

    Kalau tujuan Our Purpose / Tentang /
    Jelajahi, Cara Kerja tetap boleh
    bergerak 01-02-03 saat dilewati.
  */

  if (
    isProcessTarget
  ) {
    processNavigationLocked =
      true;

    resetProcessToStart();
  } else {
    processNavigationLocked =
      false;
  }


  const targetTop =
    target
      .getBoundingClientRect()
      .top +
    window.scrollY;


  history.replaceState(
    null,
    "",
    href
  );


  /*
    Reduced motion
  */

  if (
    reducedMotion
  ) {
    window.scrollTo({
      top: targetTop,
      behavior: "auto"
    });

    if (
      isProcessTarget
    ) {
      resetProcessToStart();

      processNavigationLocked =
        false;
    }

    navNavigationLocked =
      false;

    if (
      typeof window.__revaultUpdateActiveNavigation ===
        "function"
    ) {
      window.__revaultUpdateActiveNavigation();
    }

    return;
  }


  /*
    Smooth scroll NORMAL.

    Tidak ada skip,
    tidak ada teleport,
    tidak ada behavior:auto
    di tengah perjalanan.
  */

  window.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });


  let lastY =
    window.scrollY;

  let stableFrames =
    0;

  let finished =
    false;

  const startTime =
    performance.now();


  function finishNavigation() {
    if (
      finished
    ) {
      return;
    }

    finished =
      true;


    /*
      Kalau tujuan Cara Kerja,
      pastikan benar-benar kembali
      ke step 01 setelah sampai.
    */

    if (
      isProcessTarget
    ) {
      resetProcessToStart();

      processNavigationLocked =
        false;

      resetProcessToStart();
    }


    navNavigationLocked =
      false;


    /*
      Pertahankan menu tujuan aktif.
    */

    if (
      sectionName &&
      typeof window.__revaultSetActiveNav ===
        "function"
    ) {
      window.__revaultSetActiveNav(
        sectionName
      );
    }


    if (
      typeof window.__revaultUpdateActiveNavigation ===
        "function"
    ) {
      window.__revaultUpdateActiveNavigation();
    }
  }


  /*
    Deteksi kapan smooth scroll selesai.
  */

  function watchScroll() {
    if (
      finished
    ) {
      return;
    }


    const currentY =
      window.scrollY;


    const distance =
      Math.abs(
        currentY -
        targetTop
      );


    const movement =
      Math.abs(
        currentY -
        lastY
      );


    if (
      distance < 2 &&
      movement < .5
    ) {
      stableFrames++;
    } else {
      stableFrames = 0;
    }


    lastY =
      currentY;


    const timeout =
      performance.now() -
        startTime >
      3000;


    if (
      stableFrames >= 3 ||
      timeout
    ) {
      finishNavigation();

      return;
    }


    requestAnimationFrame(
      watchScroll
    );
  }


  requestAnimationFrame(
    watchScroll
  );
}

function initAnchorNavigation() {
  $$(
    ".nav-anchor"
  ).forEach(
    (link) => {
      link.addEventListener(
        "click",
        (event) => {
          const href =
            link.getAttribute(
              "href"
            );

          if (
            !href ||
            !href.startsWith(
              "#"
            )
          ) {
            return;
          }

          const target =
            document.querySelector(
              href
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          navigateToTarget(
            target,
            href
          );
        }
      );
    }
  );
}


/* =========================================================
   CURSOR
========================================================= */

function initCursor() {
  if (
    coarsePointer ||
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {
    return;
  }

  document.addEventListener(
    "mousemove",
    (event) => {
      cursorGlow.style.opacity =
        "1";

      gsap.to(
        cursorGlow,
        {
          x:
            event.clientX,

          y:
            event.clientY,

          duration:
            .75,

          ease:
            "power3.out",

          overwrite:
            true
        }
      );
    }
  );
}


/* =========================================================
   MODAL
========================================================= */

function openModal(id) {
  const product =
    products.find(
      (item) =>
        Number(
          item.id
        ) ===
        Number(
          id
        )
    );

  if (!product) {
    return;
  }

  currentModalProduct =
    product;

  modalAsset.src =
    product.asset;

  modalCategory.textContent =
    product.category;

  modalTitle.textContent =
    product.name;

  modalCondition.textContent =
    product.condition;

  modalLocation.textContent =
    product.location;

  modalDescription.textContent =
    product.description;

  modalVisual.className =
    `modal-visual theme-${product.theme}`;

  detailModal.classList.remove(
    "hidden"
  );

  document.body.classList.add(
    "modal-open"
  );

  if (
    typeof gsap !==
      "undefined" &&
    !reducedMotion
  ) {
    gsap.fromTo(
      detailModal,
      {
        autoAlpha:
          0
      },
      {
        autoAlpha:
          1,

        duration:
          .2
      }
    );

    gsap.fromTo(
      ".detail-modal",
      {
        autoAlpha:
          0,

        y:
          28,

        scale:
          .96
      },
      {
        autoAlpha:
          1,

        y:
          0,

        scale:
          1,

        duration:
          .42,

        ease:
          "back.out(1.12)"
      }
    );
  }
}

function closeModal() {
  if (
    detailModal.classList.contains(
      "hidden"
    )
  ) {
    return;
  }

  const finish =
    () => {
      detailModal.classList.add(
        "hidden"
      );

      document.body.classList.remove(
        "modal-open"
      );

      currentModalProduct =
        null;
    };

  if (
    typeof gsap ===
      "undefined" ||
    reducedMotion
  ) {
    finish();

    return;
  }

  gsap.to(
    ".detail-modal",
    {
      autoAlpha:
        0,

      y:
        18,

      scale:
        .98,

      duration:
        .16
    }
  );

  gsap.to(
    detailModal,
    {
      autoAlpha:
        0,

      duration:
        .18,

      onComplete:
        finish
    }
  );
}


/* =========================================================
   TOAST
========================================================= */

function showToast(
  title,
  message
) {
  toastTitle.textContent =
    title;

  toastMessage.textContent =
    message;

  clearTimeout(
    toastTimer
  );

  if (
    typeof gsap !==
      "undefined" &&
    !reducedMotion
  ) {
    gsap.to(
      toast,
      {
        autoAlpha:
          1,

        y:
          0,

        duration:
          .34,

        ease:
          "back.out(1.6)",

        overwrite:
          true
      }
    );
  } else {
    toast.style.opacity =
      "1";

    toast.style.transform =
      "translateY(0)";
  }

  toastTimer =
    setTimeout(
      () => {
        if (
          typeof gsap !==
            "undefined" &&
          !reducedMotion
        ) {
          gsap.to(
            toast,
            {
              autoAlpha:
                0,

              y:
                35,

              duration:
                .28,

              overwrite:
                true
            }
          );
        } else {
          toast.style.opacity =
            "0";

          toast.style.transform =
            "translateY(35px)";
        }
      },
      3000
    );
}


/* =========================================================
   POSTING BARANG
========================================================= */

function addProduct(event) {
  event.preventDefault();

  const name =
    namaBarang.value
      .trim();

  const category =
    kategoriForm.value;

  const location =
    lokasi.value
      .trim();

  const condition =
    kondisi.value;

  const description =
    deskripsi.value
      .trim();

  if (
    !name ||
    !category ||
    !location ||
    !condition ||
    !description
  ) {
    showToast(
      "Data belum lengkap",
      "Lengkapi seluruh informasi barang."
    );

    return;
  }

  products.unshift({
    id:
      Date.now(),

    name,

    category,

    location,

    condition,

    description,

    asset:
      assets[
        category
      ] ||
      assets.Lainnya,

    theme:
      themes[
        category
      ] ||
      "gray"
  });

  saveProducts();

  heroIndex =
    0;

  searchInput.value =
    "";

  categoryFilter.value =
    "semua";

  renderEverything();

  updateHero(
    false
  );

  restartHeroSlider();

  postingForm.reset();

  kategoriForm.value =
    "";

  kondisi.value =
    "";

  descriptionCount.textContent =
    "0";

  refreshEnhancedSelect(
    kategoriForm
  );

  refreshEnhancedSelect(
    kondisi
  );

  refreshEnhancedSelect(
    categoryFilter
  );

  showToast(
    "Barang berhasil diposting",
    `${name} sekarang tampil di Revault.`
  );

  setTimeout(
    () => {
      navigateToTarget(
        $("#barang"),
        "#barang"
      );
    },
    180
  );
}


/* =========================================================
   SCROLL UI
========================================================= */

function updateScrollUI() {
  const scrollY =
    window.scrollY;

  navbar.classList.toggle(
    "scrolled",
    scrollY > 25
  );

  const maxScroll =
    document
      .documentElement
      .scrollHeight -
    window.innerHeight;

  const progress =
    maxScroll > 0
      ? (
          scrollY /
          maxScroll
        ) *
        100
      : 0;

  pageProgress.style.width =
    `${progress}%`;
}


/* =========================================================
   EVENTS
========================================================= */

searchInput.addEventListener(
  "input",
  filterProducts
);

categoryFilter.addEventListener(
  "change",
  filterProducts
);

heroNext.addEventListener(
  "click",
  () => {
    nextHero();

    restartHeroSlider();
  }
);

heroPrev.addEventListener(
  "click",
  () => {
    previousHero();

    restartHeroSlider();
  }
);

featuredDetail.addEventListener(
  "click",
  () => {
    openModal(
      featuredCard.dataset.id
    );
  }
);

productGrid.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        ".product-detail"
      );

    if (button) {
      openModal(
        button.dataset.id
      );
    }
  }
);

postingForm.addEventListener(
  "submit",
  addProduct
);

deskripsi.addEventListener(
  "input",
  () => {
    descriptionCount.textContent =
      deskripsi.value.length;
  }
);

modalClose.addEventListener(
  "click",
  closeModal
);

detailModal.addEventListener(
  "click",
  (event) => {
    if (
      event.target ===
      detailModal
    ) {
      closeModal();
    }
  }
);

requestButton.addEventListener(
  "click",
  () => {
    if (
      !currentModalProduct
    ) {
      return;
    }

    const name =
      currentModalProduct.name;

    closeModal();

    showToast(
      "Pengajuan berhasil",
      `Permintaan untuk ${name} telah dicatat.`
    );
  }
);

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key ===
      "Escape"
    ) {
      closeModal();

      closeAllSelects();

      mobileNav.classList.remove(
        "open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  }
);

window.addEventListener(
  "scroll",
  updateScrollUI,
  {
    passive:
      true
  }
);

document.addEventListener(
  "visibilitychange",
  () => {
    if (
      document.hidden
    ) {
      clearInterval(
        heroTimer
      );
    } else {
      restartHeroSlider();
    }
  }
);


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderEverything() {
  renderProducts();

  renderCategoryFilter();

  updateStats();

  renderSliderDots();
}


/* =========================================================
   START
========================================================= */

initCustomSelects();

renderEverything();

updateHero(
  false
);

updateScrollUI();

initNavigation();

initAnchorNavigation();

initNavMotion();

initHeroIntro();

initHeroTilt();

initProcessStory();

initMobileProcessCarousel();

initScrollReveal();

initTicker();

initOrbit();

initFloatingAnimations();

initMagneticButtons();

initPostingCardMotion();

initCursor();

animateCounters();

restartHeroSlider();


/* =========================================================
   LOAD
========================================================= */

window.addEventListener(
  "load",
  () => {
    if (
      typeof ScrollTrigger !==
      "undefined"
    ) {
      requestAnimationFrame(
        () => {
          ScrollTrigger.refresh();
        }
      );
    }

    if (
      window.location.hash ===
      "#cara-kerja"
    ) {
      resetProcessToStart();

      requestAnimationFrame(
        () => {
          const target =
            $("#cara-kerja");

          if (target) {
            window.scrollTo({
              top:
                target.getBoundingClientRect()
                  .top +
                window.scrollY,

              behavior:
                "auto"
            });
          }
        }
      );
    }
  }
);