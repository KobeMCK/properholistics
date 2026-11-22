(function () {
  const products = [...window.PH_PRODUCTS].sort((a, b) => a.price - b.price);
  const stacks = window.PH_STACKS;
  const discount = window.PH_STACK_DISCOUNT;
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const stackById = Object.fromEntries(stacks.map((s) => [s.id, s]));
  const CART_KEY = "ph-cart-v1";

  const money = (n) => `$${n.toFixed(2)} CAD`;
  const stackProducts = (s) => s.items.map((i) => productById[i.id]);
  const stackRetail = (s) => stackProducts(s).reduce((sum, p) => sum + p.price, 0);
  const stackPrice = (s) => Math.round(stackRetail(s) * (1 - discount) * 100) / 100;

  let cart = loadCart();

  // Packshots grouped on a shared floor so each stack reads as a real bundle.
  function bundle(s, { floor = 12 } = {}) {
    const items = stackProducts(s);
    const n = items.length;
    const width = n === 2 ? 60 : n === 3 ? 52 : 44;
    const step = n > 1 ? (100 - width) / (n - 1) : 0;
    return items
      .map((p, i) => {
        const left = n > 1 ? i * step : (100 - width) / 2;
        return `<span aria-hidden="true" style="left:${left}%;width:${width}%;bottom:${floor}%;z-index:${i + 1};aspect-ratio:1;background-image:url('${p.image}')" class="absolute block bg-contain bg-bottom bg-no-repeat mix-blend-multiply"></span>`;
      })
      .join("");
  }

  function loadCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return parsed.filter((l) => (l.type === "product" ? productById[l.id] : stackById[l.id]));
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  function addToCart(type, id) {
    const line = cart.find((l) => l.type === type && l.id === id);
    if (line) line.qty += 1;
    else cart.push({ type, id, qty: 1 });
    saveCart();
    openCart();
  }

  function changeQty(type, id, delta) {
    const line = cart.find((l) => l.type === type && l.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter((l) => l !== line);
    saveCart();
  }

  const essentials = [
    "thorne-creatine",
    "thorne-whey-protein-isolate",
    "thorne-magnesium-bisglycinate",
    "dfh-omegavail-hi-po",
    "dfh-vitamin-d-supreme",
    "thorne-basic-nutrients-2-day",
    "dfs-hydration-packs",
    "thorne-florasport-20b",
  ].map((id) => productById[id]);

  const optionsFor = (category) => products.filter((p) => p.category === category);

  function categoryCard(cover) {
    const options = optionsFor(cover.category);
    const from = Math.min(...options.map((p) => p.price));
    const summary = options.length > 1 ? `${options.length} options &middot; from ${money(from)}` : `${cover.brand} &middot; ${money(from)}`;
    return `
      <li>
        <button type="button" data-category="${cover.category}" aria-haspopup="dialog" class="group flex w-full cursor-pointer flex-col gap-3 text-left">
          <span class="flex aspect-square w-full items-center justify-center p-6">
            <img src="${cover.image}" alt="" class="max-h-full w-auto object-contain mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none">
          </span>
          <span class="flex flex-col gap-1">
            <span class="font-medium">${cover.category}</span>
            <span class="text-mute">${summary}</span>
          </span>
        </button>
      </li>`;
  }

  function renderProducts() {
    document.getElementById("product-grid").innerHTML = essentials.map(categoryCard).join("");
  }

  function optionRow(p) {
    return `
      <li class="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-6">
        <img src="${p.image}" alt="${p.brand} ${p.name}" class="h-28 w-28 shrink-0 self-center object-contain mix-blend-multiply">
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <p class="font-medium">${p.name}</p>
          <p class="text-mute">${p.brand}${p.certified ? " &middot; NSF Certified for Sport" : ""} &middot; ${p.format}</p>
          <p class="mt-1 leading-relaxed text-pretty">${window.PH_DESCRIPTIONS[p.id] || ""}</p>
        </div>
        <div class="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
          <span>${money(p.price)}</span>
          <button type="button" data-add-product="${p.id}" class="bg-ink px-5 py-2.5 text-paper transition hover:opacity-85">Add to cart</button>
        </div>
      </li>`;
  }

  function openCategory(category) {
    const options = optionsFor(category);
    document.getElementById("stack-dialog-body").innerHTML = `
      <div class="flex max-h-[85vh] flex-col overflow-y-auto px-8 pt-8 pb-2">
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1">
            <h2 id="stack-dialog-title" class="text-sm font-medium">${category}</h2>
            <p class="text-mute">${options.length > 1 ? `${options.length} options from the brands we trust` : "Our pick"}</p>
          </div>
          <button type="button" data-close class="text-mute hover:text-ink">Close</button>
        </div>
        <ul class="flex flex-col divide-y divide-line">${options.map(optionRow).join("")}</ul>
      </div>`;
    document.getElementById("stack-dialog").showModal();
  }

  function cartLineView(line) {
    if (line.type === "stack") {
      const s = stackById[line.id];
      return {
        title: `${s.name} Stack`,
        sub: stackProducts(s).map((p) => p.name).join(" + "),
        thumb: `<span class="relative block h-full w-full">${bundle(s, { floor: 8 })}</span>`,
        unit: stackPrice(s),
      };
    }
    const p = productById[line.id];
    return {
      title: p.name,
      sub: p.brand,
      thumb: `<img src="${p.image}" alt="" class="max-h-full w-auto object-contain mix-blend-multiply">`,
      unit: p.price,
    };
  }

  function renderCart() {
    document.getElementById("cart-count").textContent = cart.reduce((n, l) => n + l.qty, 0);
    const body = document.getElementById("cart-lines");
    if (!cart.length) {
      body.innerHTML = `<p class="px-6 py-4 text-mute">Your cart is empty.</p>`;
      document.getElementById("cart-total").textContent = money(0);
      return;
    }
    let total = 0;
    body.innerHTML = `<ul class="flex flex-col gap-6 px-6 py-4">${cart
      .map((l) => {
        const v = cartLineView(l);
        total += v.unit * l.qty;
        return `
        <li class="flex gap-4">
          <div class="flex size-16 shrink-0 items-center justify-center">${v.thumb}</div>
          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <p>${v.title}</p>
            <p class="truncate text-mute">${v.sub}</p>
            <div class="mt-1 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <button type="button" data-qty="-1" data-type="${l.type}" data-id="${l.id}" class="px-1 text-mute hover:text-ink" aria-label="Decrease quantity of ${v.title}">&minus;</button>
                <span aria-live="polite">${l.qty}</span>
                <button type="button" data-qty="1" data-type="${l.type}" data-id="${l.id}" class="px-1 text-mute hover:text-ink" aria-label="Increase quantity of ${v.title}">+</button>
              </div>
              <span>${money(v.unit * l.qty)}</span>
            </div>
          </div>
        </li>`;
      })
      .join("")}</ul>`;
    document.getElementById("cart-total").textContent = money(total);
  }

  function openCart() {
    const d = document.getElementById("cart-dialog");
    if (!d.open) d.showModal();
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, dialog");
    if (!t) return;
    if (t.tagName === "DIALOG") {
      if (e.target === t) t.close();
      return;
    }
    if (t.dataset.category) {
      openCategory(t.dataset.category);
    } else if (t.dataset.addProduct) {
      document.getElementById("stack-dialog").close();
      addToCart("product", t.dataset.addProduct);
    } else if (t.dataset.qty) {
      changeQty(t.dataset.type, t.dataset.id, Number(t.dataset.qty));
    } else if (t.hasAttribute("data-open-cart")) {
      openCart();
    } else if (t.hasAttribute("data-close")) {
      t.closest("dialog").close();
    }
  });

  renderProducts();
  renderCart();
})();
