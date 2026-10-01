"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import HomeCategories from "./HomeCategories";

const PAGE_SIZE = 12;

const filters = [
  ["all", "All"],
  ["electronics", "Electronics"],
  ["fashion", "Fashion"],
  ["home", "Home"],
  ["beauty", "Beauty"],
  ["saved", "♥ Wishlist"],
];

function imageUrl(value, width = 700) {
  if (typeof value !== "string") return "";

  if (/^https:\/\//i.test(value)) {
    return value;
  }

  if (/^photo-[a-z0-9-]+$/i.test(value)) {
    return `https://images.unsplash.com/${value}?w=${width}&q=85&fit=crop`;
  }

  return "";
}

/* Shared by product cards, product detail and cart. */

export function Photo({
  image,
  emoji = "🛍️",
  alt = "",
  width = 700,
  className = "",
  imgClassName = "object-cover",
}) {
  const [failed, setFailed] = useState(false);

  const src = imageUrl(image, width);

  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-[#f4f6f6] ${className}`}
    >
      <span aria-hidden="true" className="text-5xl">
        {emoji}
      </span>

      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full ${imgClassName}`}
        />
      )}
    </div>
  );
}

export default function HomeContent({
  productsRef,
  visibleProducts,
  query,
  filter,
  setFilter,
  setQuery,
  setSearchCategory,
  sort,
  setSort,
  wishlist,
  money,
  onExplore,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  yellow,
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  /*
   * IMPORTANT:
   *
   * Home mode is determined by whether the user has an active
   * search/filter state.
   *
   * On a completely fresh page load:
   *
   * query = ""
   * filter = "all"
   *
   * Therefore HomeCategories is shown.
   *
   * When the user clicks a homepage category, onExplore()
   * changes query/filter in the parent and the product section
   * appears.
   */

  const isProductMode = query.trim() !== "" || filter !== "all";

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter, query, sort, wishlist, visibleProducts]);

  function handleHomeExplore(category, searchQuery) {
    /*
     * This keeps the existing parent search/filter system.
     */
    onExplore(category, searchQuery);
  }

  function handleFilterClick(value) {
    setFilter(value);
    setQuery("");
    setSearchCategory("all");
    setVisibleCount(PAGE_SIZE);

    window.setTimeout(() => {
      productsRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function handleBackToHome() {
    /*
     * Clear the parent's search/filter state.
     *
     * Once these become:
     *
     * query = ""
     * filter = "all"
     *
     * HomeCategories automatically appears again.
     */
    setFilter("all");
    setQuery("");
    setSearchCategory("all");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const displayedProducts = visibleProducts.slice(0, visibleCount);

  const hasMoreProducts = visibleCount < visibleProducts.length;

  /*
   * ============================================================
   * HOME MODE
   * ============================================================
   *
   * No product grid is rendered here.
   *
   * HomeCategories is completely separate from products.
   */

  if (!isProductMode) {
    return (
      <div className="bg-[#eaeded]">
        <HomeCategories onExplore={handleHomeExplore} />
      </div>
    );
  }

  /*
   * ============================================================
   * PRODUCT / SEARCH MODE
   * ============================================================
   */

  return (
    <div className="bg-[#eaeded]">
      <div className="relative z-10 space-y-5 px-3 pb-7 pt-5 sm:px-5 md:px-6 lg:px-8">
        <section
          id="products"
          ref={productsRef}
          className="min-w-0 rounded-[18px] border border-[#d9e3e9] bg-white p-3.5 shadow-sm sm:p-4 md:p-6"
        >
          <div className="mb-5 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div>
              <h2 className="text-[20px] font-extrabold sm:text-[23px]">
                {query.trim()
                  ? `Results for "${query.trim()}"`
                  : filter === "saved"
                    ? "Your wishlist"
                    : "Explore products"}
              </h2>

              <p className="text-xs text-slate-500">
                Showing {displayedProducts.length} of {visibleProducts.length}{" "}
                products
              </p>
            </div>

            <select
              aria-label="Sort products"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full rounded-md border border-[#d5d9d9] bg-[#f7fafa] p-2 sm:w-auto"
            >
              <option value="featured">Best match</option>

              <option value="low">Price: Low to High</option>

              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* FILTERS */}

          <div className="mb-5 flex flex-wrap gap-1.5 sm:gap-2">
            {filters.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => handleFilterClick(value)}
                aria-pressed={filter === value}
                className={`rounded-full border px-3 py-2 text-[11px] transition hover:-translate-y-0.5 sm:px-4 sm:text-xs ${
                  filter === value
                    ? "border-[#232f3e] bg-[#232f3e] text-white"
                    : "border-[#d5d9d9] bg-white hover:bg-[#f3f6f6]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {visibleProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-500">
                No products found. Try another search or category.
              </p>

              <button
                type="button"
                onClick={handleBackToHome}
                className="mt-4 rounded-full bg-[#232f3e] px-5 py-2 text-sm font-bold text-white"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <>
              {/* PRODUCT GRID */}

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 xl:grid-cols-6">
                {displayedProducts.map((product) => (
                  <article
                    key={product.id}
                    className="relative flex min-w-0 flex-col rounded-lg border border-[#e2e8eb] p-2 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-2.5"
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate(`product/${product.id}`)}
                      className="w-full text-left"
                      aria-label={`View ${product.name}`}
                    >
                      <Photo
                        image={product.image}
                        emoji={product.emoji}
                        width={400}
                        className="h-28 w-full rounded-md sm:h-32 md:h-40"
                        imgClassName="object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                      />

                      <span className="mt-2 block text-[11px] text-slate-500 capitalize">
                        {product.category}
                      </span>

                      <span className="my-1.5 block min-h-10 text-[13px] leading-snug hover:text-[#c45500] sm:text-sm">
                        {product.name}
                      </span>

                      <strong className="text-[17px] sm:text-[19px]">
                        {money(product.price)}
                      </strong>

                      {product.oldPrice > 0 && (
                        <span className="ml-1 text-xs text-slate-500 line-through">
                          {money(product.oldPrice)}
                        </span>
                      )}
                    </button>

                    {/* WISHLIST */}

                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label={`Toggle wishlist for ${product.name}`}
                      className={`absolute top-3 right-3 z-10 rounded-full bg-white px-2 py-1 text-lg sm:top-4 sm:right-4 sm:text-xl ${
                        wishlist.includes(product.id)
                          ? "text-red-500"
                          : "text-slate-500"
                      }`}
                    >
                      {wishlist.includes(product.id) ? "♥" : "♡"}
                    </button>

                    {/* ADD TO CART */}

                    <button
                      type="button"
                      onClick={() => onAddToCart(product.id)}
                      className={`${yellow} mt-3 min-h-9 w-full px-2 text-[11px] sm:text-xs`}
                    >
                      Add to Cart
                    </button>
                  </article>
                ))}
              </div>

              {/* SHOW MORE */}

              {hasMoreProducts && (
                <div className="flex justify-center py-9">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((current) =>
                        Math.min(current + PAGE_SIZE, visibleProducts.length),
                      )
                    }
                    className="rounded-full border border-[#94a3b8]/60 bg-white/30 px-7 py-3 text-sm font-extrabold text-[#10202d] shadow-[0_8px_30px_#10202d1a] backdrop-blur-md transition hover:scale-105 hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#232f3e] sm:px-9"
                  >
                    Show more
                  </button>
                </div>
              )}

              {!hasMoreProducts && visibleProducts.length > PAGE_SIZE && (
                <p className="pt-6 text-center text-xs text-slate-500">
                  You&apos;ve seen all products in this selection.
                </p>
              )}

              {/* BACK HOME */}

              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={handleBackToHome}
                  className="rounded-full border border-[#d5d9d9] bg-white px-6 py-2.5 text-sm font-bold text-[#232f3e] transition hover:bg-[#f3f6f6]"
                >
                  ← Back to Home
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
