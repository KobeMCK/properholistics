(function () {
  const products = window.PH_PRODUCTS;
  const stacks = window.PH_STACKS;
  const brands = window.PH_BRANDS;
  const categories = window.PH_CATEGORIES;
  const discount = window.PH_STACK_DISCOUNT;
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const stackById = Object.fromEntries(stacks.map((s) => [s.id, s]));
  const CART_KEY = "ph-cart-v1";

  const money = (n) => `$${n.toFixed(2)} CAD`;
  const stackProducts = (s) => s.items.map((i) => productById[i.id]);
  const stackRetail = (s) => stackProducts(s).reduce((sum, p) => sum + p.price, 0);
  const stackPrice = (s) => Math.round(stackRetail(s) * (1 - discount) * 100) / 100;
  const stackCertified = (s) => stackProducts(s).every((p) => p.certified);
  const stacksFor = (productId) => stacks.filter((s) => s.items.some((i) => i.id === productId));

  const filters = { brand: "All", category: "All", certified: false };
  let cart = loadCart();

  const certBadge = (extra = "") =>
    `<span class="inline-flex items-center border border-ink px-1.5 py-0.5 font-mono text-[10px] uppercase leading-none tracking-wider ${extra}">NSF Sport</span>`;

  // Product packshots lined up on a shared floor, so each stack reads as a real bundle.
  // Product packshots grouped on a shared floor, so each stack reads as a real bundle.
  function bundle(s, { floor = 14 } = {}) {
    const items = stackProducts(s);
    const n = items.length;
    const width = n >= 4 ? 44 : 52;
    const step = n > 1 ? (100 - width) / (n - 1) : 0;
    const center = (n - 1) / 2;
    return items
      .map((p, i) => {
        const inner = Math.abs(i - center) < 1;
        const w = inner ? width * 1.08 : width;
        const left = (n > 1 ? i * step : (100 - width) / 2) - (w - width) / 2;
        const z = inner ? 2 : 1;
        return `<span aria-hidden="true" style="left:${left}%;width:${w}%;bottom:${floor}%;z-index:${z};aspect-ratio:1;background-image:url('${p.image}')" class="absolute block bg-contain bg-bottom bg-no-repeat mix-blend-multiply"></span>`;
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

  function renderStacks() {
    document.getElementById("stacks-count").textContent = `${stacks.length} protocols`;
    document.getElementById("stacks-grid").innerHTML = stacks
      .map(
        (s) => `
      <li>
        <button type="button" data-stack="${s.id}" class="group flex w-full flex-col gap-3 text-left">
          <span class="relative block aspect-[4/5] w-full overflow-hidden border border-line bg-paper">
            <span class="absolute inset-0 transition duration-700 group-hover:scale-[1.04]">${bundle(s)}</span>
            ${stackCertified(s) ? certBadge("absolute left-3 top-3 bg-paper") : ""}
            <span class="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-wider text-mute">${s.items.length} items</span>
          </span>
          <span class="text-sm font-medium">${s.name} Stack</span>
          <span class="-mt-2 flex items-baseline justify-between gap-2 text-xs text-mute">
            <span>${s.tagline}</span>
            <span class="whitespace-nowrap">${money(stackPrice(s))}</span>
          </span>
        </button>
      </li>`
      )
      .join("");
  }

  function filterButton(group, value, label = value) {
    const active = filters[group] === value;
    return `<button type="button" data-filter="${group}" data-value="${value}" aria-pressed="${active}"
      class="whitespace-nowrap font-mono text-[11px] uppercase tracking-wider transition ${active ? "text-ink underline underline-offset-4" : "text-mute hover:text-ink"}">${label}</button>`;
  }

  function renderFilters() {
    document.getElementById("category-filters").innerHTML = ["All", ...categories].map((c) => filterButton("category", c)).join("");
    document.getElementById("brand-filters").innerHTML = ["All", ...brands].map((b) => filterButton("brand", b)).join("");
    const cert = document.getElementById("certified-filter");
    cert.setAttribute("aria-pressed", String(filters.certified));
    cert.className = `inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider transition ${filters.certified ? "text-ink" : "text-mute hover:text-ink"}`;
    cert.querySelector("[data-box]").className = `inline-block size-3 border border-current ${filters.certified ? "bg-ink" : ""}`;
  }

  function renderProducts() {
    const list = products.filter(
      (p) =>
        (filters.brand === "All" || p.brand === filters.brand) &&
        (filters.category === "All" || p.category === filters.category) &&
        (!filters.certified || p.certified)
    );
    document.getElementById("product-count").textContent = `${list.length} products`;
    const grid = document.getElementById("products-grid");
    if (!list.length) {
      grid.innerHTML = `<li class="col-span-full py-16 text-sm text-mute">Nothing matches those filters.</li>`;
      return;
    }
    grid.innerHTML = list
      .map((p) => {
        const inStacks = stacksFor(p.id);
        return `
      <li class="group flex flex-col">
        <div class="relative mb-4 flex aspect-square items-center justify-center overflow-hidden bg-wash p-8">
          <img src="${p.image}" alt="${p.brand} ${p.name}" loading="lazy" class="max-h-full w-auto object-contain mix-blend-multiply transition duration-500 group-hover:scale-105">
          ${p.certified ? certBadge("absolute left-3 top-3 bg-paper") : ""}
          <button type="button" data-add-product="${p.id}"
            class="absolute inset-x-0 bottom-0 bg-ink py-3 font-mono text-[11px] uppercase tracking-wider text-paper transition md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100">
            Add to cart<span class="sr-only">: ${p.name}</span>
          </button>
        </div>
        <p class="font-mono text-[11px] uppercase tracking-wider text-mute">${p.brand} &middot; ${p.category}</p>
        <h3 class="mt-1 text-sm font-medium">${p.name}</h3>
        <p class="mt-1 text-xs text-mute">${p.format}</p>
        <div class="mt-2 flex items-baseline justify-between gap-2 text-xs">
          <span>${money(p.price)}</span>
          ${
            inStacks.length
              ? `<span class="flex flex-wrap justify-end gap-x-2 text-mute">${inStacks
                  .map((s) => `<button type="button" data-stack="${s.id}" class="hover:text-ink hover:underline">${s.name}</button>`)
                  .join("")}</span>`
              : ""
          }
        </div>
      </li>`;
      })
      .join("");
  }

  function openStack(id) {
    const s = stackById[id];
    document.getElementById("stack-dialog-body").innerHTML = `
      <div class="grid md:grid-cols-2">
        <div class="relative hidden border-r border-line bg-paper md:block">
          ${bundle(s, { floor: 22 })}
          ${stackCertified(s) ? certBadge("absolute left-6 top-6 bg-paper") : ""}
        </div>
        <div class="flex max-h-[85vh] flex-col overflow-y-auto">
          <div class="flex items-start justify-between gap-4 border-b border-line p-6">
            <div>
              <p class="font-mono text-[11px] uppercase tracking-wider text-mute">Stack</p>
              <h2 id="stack-dialog-title" class="mt-1 text-2xl font-medium tracking-tight">${s.name}</h2>
              <p class="mt-3 max-w-sm text-sm leading-relaxed text-mute text-pretty">${s.summary}</p>
            </div>
            <button type="button" data-close class="font-mono text-[11px] uppercase tracking-wider text-mute hover:text-ink">Close</button>
          </div>
          <ul class="flex flex-col">
            ${s.items
              .map((i) => {
                const p = productById[i.id];
                return `
              <li class="flex items-center gap-4 border-b border-line p-6">
                <div class="flex size-20 shrink-0 items-center justify-center bg-wash p-2">
                  <img src="${p.image}" alt="" class="max-h-full w-auto object-contain mix-blend-multiply">
                </div>
                <div class="flex min-w-0 flex-1 flex-col gap-1">
                  <p class="font-mono text-[11px] uppercase tracking-wider text-mute">${p.brand}</p>
                  <p class="text-sm font-medium">${p.name}</p>
                  <p class="text-xs leading-relaxed text-mute">${i.note}</p>
                </div>
                <span class="whitespace-nowrap text-xs text-mute">${money(p.price)}</span>
              </li>`;
              })
              .join("")}
          </ul>
          <div class="mt-auto flex flex-col gap-4 p-6">
            <div class="flex items-baseline justify-between text-sm">
              <span class="text-mute">Bought separately <s>${money(stackRetail(s))}</s></span>
              <span class="font-medium">${money(stackPrice(s))}</span>
            </div>
            <button type="button" data-add-stack="${s.id}" class="bg-ink py-4 font-mono text-xs uppercase tracking-wider text-paper transition hover:opacity-85">
              Add ${s.name} Stack &mdash; Save ${Math.round(discount * 100)}%
            </button>
          </div>
        </div>
      </div>`;
    document.getElementById("stack-dialog").showModal();
  }

  function cartLineView(line) {
    if (line.type === "stack") {
      const s = stackById[line.id];
      return {
        title: `${s.name} Stack`,
        sub: stackProducts(s).map((p) => p.name).join(", "),
        thumb: `<span class="relative block h-full w-full">${bundle(s, { floor: 6 })}</span>`,
        unit: stackPrice(s),
      };
    }
    const p = productById[line.id];
    return {
      title: p.name,
      sub: p.brand,
      thumb: `<img src="${p.image}" alt="" class="max-h-full w-auto object-contain p-2 mix-blend-multiply">`,
      unit: p.price,
    };
  }

  function renderCart() {
    document.getElementById("cart-count").textContent = cart.reduce((n, l) => n + l.qty, 0);
    const body = document.getElementById("cart-lines");
    if (!cart.length) {
      body.innerHTML = `<p class="p-6 text-sm text-mute">Your cart is empty.</p>`;
      document.getElementById("cart-total").textContent = money(0);
      return;
    }
    let total = 0;
    body.innerHTML = `<ul class="flex flex-col">${cart
      .map((l) => {
        const v = cartLineView(l);
        total += v.unit * l.qty;
        return `
        <li class="flex gap-4 border-b border-line p-6">
          <div class="flex size-20 shrink-0 items-center justify-center overflow-hidden ${l.type === "stack" ? "border border-line bg-paper" : "bg-wash"}">${v.thumb}</div>
          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <p class="text-sm font-medium">${v.title}</p>
            <p class="truncate text-xs text-mute">${v.sub}</p>
            <div class="mt-auto flex items-center justify-between">
              <div class="flex items-center gap-3 font-mono text-xs">
                <button type="button" data-qty="-1" data-type="${l.type}" data-id="${l.id}" class="px-1 text-mute hover:text-ink" aria-label="Decrease quantity of ${v.title}">&minus;</button>
                <span aria-live="polite">${l.qty}</span>
                <button type="button" data-qty="1" data-type="${l.type}" data-id="${l.id}" class="px-1 text-mute hover:text-ink" aria-label="Increase quantity of ${v.title}">+</button>
              </div>
              <span class="text-xs">${money(v.unit * l.qty)}</span>
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
    if (t.dataset.stack) {
      const cartDialog = document.getElementById("cart-dialog");
      if (cartDialog.open) cartDialog.close();
      openStack(t.dataset.stack);
    } else if (t.dataset.filter) {
      filters[t.dataset.filter] = t.dataset.value;
      renderFilters();
      renderProducts();
    } else if (t.id === "certified-filter") {
      filters.certified = !filters.certified;
      renderFilters();
      renderProducts();
    } else if (t.dataset.addProduct) {
      addToCart("product", t.dataset.addProduct);
    } else if (t.dataset.addStack) {
      document.getElementById("stack-dialog").close();
      addToCart("stack", t.dataset.addStack);
    } else if (t.dataset.qty) {
      changeQty(t.dataset.type, t.dataset.id, Number(t.dataset.qty));
    } else if (t.hasAttribute("data-open-cart")) {
      openCart();
    } else if (t.hasAttribute("data-close")) {
      t.closest("dialog").close();
    }
  });

  renderStacks();
  renderFilters();
  renderProducts();
  renderCart();
})();
