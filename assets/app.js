(function () {
  const products = window.PH_PRODUCTS;
  const stacks = window.PH_STACKS;
  const brands = window.PH_BRANDS;
  const discount = window.PH_STACK_DISCOUNT;
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const stackById = Object.fromEntries(stacks.map((s) => [s.id, s]));
  const CART_KEY = "ph-cart-v1";

  const money = (n) => `$${n.toFixed(2)} CAD`;
  const stackRetail = (s) => s.items.reduce((sum, i) => sum + productById[i.id].price, 0);
  const stackPrice = (s) => Math.round(stackRetail(s) * (1 - discount) * 100) / 100;
  const stacksFor = (productId) => stacks.filter((s) => s.items.some((i) => i.id === productId));

  let cart = loadCart();
  let activeBrand = "All";

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
    const grid = document.getElementById("stacks-grid");
    grid.innerHTML = stacks
      .map(
        (s) => `
      <li>
        <button type="button" data-stack="${s.id}" class="group flex w-full flex-col gap-3 text-left">
          <span class="block aspect-[4/5] w-full overflow-hidden bg-wash">
            <img src="${s.image}" alt="${s.imageAlt}" loading="lazy" class="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03]">
          </span>
          <span class="flex items-baseline justify-between gap-2">
            <span class="text-sm font-medium">${s.name} Stack</span>
            <span class="font-mono text-[11px] text-mute">${s.items.length} items</span>
          </span>
          <span class="-mt-2 flex items-baseline justify-between gap-2 text-xs text-mute">
            <span>${s.tagline}</span>
            <span class="whitespace-nowrap">${money(stackPrice(s))}</span>
          </span>
        </button>
      </li>`
      )
      .join("");
  }

  function renderFilters() {
    const wrap = document.getElementById("brand-filters");
    wrap.innerHTML = ["All", ...brands]
      .map(
        (b) => `
      <button type="button" data-brand="${b}" aria-pressed="${b === activeBrand}"
        class="font-mono text-[11px] uppercase tracking-wider transition ${b === activeBrand ? "text-ink underline underline-offset-4" : "text-mute hover:text-ink"}">${b}</button>`
      )
      .join("");
  }

  function renderProducts() {
    const list = activeBrand === "All" ? products : products.filter((p) => p.brand === activeBrand);
    document.getElementById("product-count").textContent = `${list.length} products`;
    document.getElementById("products-grid").innerHTML = list
      .map((p) => {
        const inStacks = stacksFor(p.id);
        return `
      <li class="group flex flex-col">
        <div class="relative mb-4 flex aspect-square items-center justify-center overflow-hidden bg-wash p-8">
          <img src="${p.image}" alt="${p.brand} ${p.name}" loading="lazy" class="max-h-full w-auto object-contain mix-blend-multiply transition duration-500 group-hover:scale-105">
          <button type="button" data-add-product="${p.id}"
            class="absolute inset-x-0 bottom-0 bg-ink py-3 font-mono text-[11px] uppercase tracking-wider text-paper opacity-100 transition md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100">
            Add to cart<span class="sr-only">: ${p.name}</span>
          </button>
        </div>
        <p class="font-mono text-[11px] uppercase tracking-wider text-mute">${p.brand}</p>
        <h3 class="mt-1 text-sm font-medium">${p.name}</h3>
        <p class="mt-1 text-xs text-mute">${p.format}</p>
        <div class="mt-2 flex items-baseline justify-between gap-2 text-xs">
          <span>${money(p.price)}</span>
          ${
            inStacks.length
              ? `<span class="flex gap-2 text-mute">${inStacks
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
    const dialog = document.getElementById("stack-dialog");
    document.getElementById("stack-dialog-body").innerHTML = `
      <div class="grid h-full md:grid-cols-2">
        <div class="hidden bg-wash md:block">
          <img src="${s.image}" alt="${s.imageAlt}" class="h-full w-full object-cover grayscale">
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
                <span class="text-xs text-mute">${money(p.price)}</span>
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
    dialog.showModal();
  }

  function cartLineView(line) {
    if (line.type === "stack") {
      const s = stackById[line.id];
      return {
        title: `${s.name} Stack`,
        sub: s.items.map((i) => productById[i.id].name).join(", "),
        image: s.image,
        imgClass: "h-full w-full object-cover grayscale",
        unit: stackPrice(s),
      };
    }
    const p = productById[line.id];
    return { title: p.name, sub: p.brand, image: p.image, imgClass: "max-h-full w-auto object-contain mix-blend-multiply", unit: p.price };
  }

  function renderCart() {
    const count = cart.reduce((n, l) => n + l.qty, 0);
    document.getElementById("cart-count").textContent = count;
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
          <div class="flex size-20 shrink-0 items-center justify-center overflow-hidden bg-wash ${l.type === "stack" ? "" : "p-2"}">
            <img src="${v.image}" alt="" class="${v.imgClass}">
          </div>
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
      const open = document.getElementById("cart-dialog");
      if (open.open) open.close();
      openStack(t.dataset.stack);
    } else if (t.dataset.brand) {
      activeBrand = t.dataset.brand;
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
