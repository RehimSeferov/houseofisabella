import React, { useMemo, useRef } from "react";
import "./ShopByCategorySection.scss";

type Card = { id: string; title: string; imageUrl: string; href?: string };

export default function ShopByCategorySlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const cards: Card[] = useMemo(
    () => [
      {
        id: "mirrors",
        title: "MIRRORS",
        imageUrl:
          "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&w=1800&q=80",
        href: "/category/mirrors",
      },
      {
        id: "lighting",
        title: "LIGHTING",
        imageUrl:
          "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1800&q=80",
        href: "/category/lighting",
      },
      {
        id: "seating",
        title: "SEATING",
        imageUrl:
          "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1800&q=80",
        href: "/category/seating",
      },
      {
        id: "tables",
        title: "TABLES",
        imageUrl:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1800&q=80",
        href: "/category/tables",
      },
      {
        id: "decor",
        title: "DECOR",
        imageUrl:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80",
        href: "/category/decor",
      },
    ],
    []
  );

  function stepPx() {
    const track = trackRef.current;
    if (!track) return 0;
    const slide = track.querySelector<HTMLElement>("[data-slide='true']");
    if (!slide) return 0;

    const s = window.getComputedStyle(track);
    const gap = parseFloat(s.gap || s.columnGap || "0") || 0;
    return slide.offsetWidth + gap;
  }

  function go(dir: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * stepPx(), behavior: "smooth" });
  }

  return (
    <section className="cat2">
      <div className="cat2__container">
        <h2 className="cat2__title">SHOP BY CATEGORY</h2>

        <div className="cat2__frame">
          <div className="cat2__track" ref={trackRef} aria-label="Categories">
            {cards.map((c) => (
              <a
                key={c.id}
                data-slide="true"
                className="cat2__card"
                href={c.href ?? "#"}
              >
                <img className="cat2__img" src={c.imageUrl} alt={c.title} />
                <span className="cat2__overlay" aria-hidden="true" />
                <span className="cat2__label">{c.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="cat2__nav" aria-label="Slider controls">
          <button
            className="cat2__arrow"
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
          >
            <svg
              width="28"
              height="12"
              viewBox="0 0 28 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 1L1 6L6 11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 6H27"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            className="cat2__arrow"
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
          >
            <svg
              width="28"
              height="12"
              viewBox="0 0 28 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M22 1L27 6L22 11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 6H26"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
