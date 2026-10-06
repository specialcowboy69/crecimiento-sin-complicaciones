"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import styles from "./LocalReviewsCarousel.module.css";

type LocalReviewHighlight = {
  title: string;
  text: string;
  company: string;
  contactRole: string;
  sector: string;
};

type LocalReviewsCarouselProps = {
  items: LocalReviewHighlight[];
};

export function LocalReviewsCarousel({ items }: LocalReviewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  function updateScrollState() {
    const track = trackRef.current;
    if (!track) {
      setCanScrollPrevious(false);
      setCanScrollNext(false);
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollPrevious(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - 4);
  }

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items.length]);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const card = track?.querySelector<HTMLElement>("[data-review-card]");
    const scrollAmount = card ? card.getBoundingClientRect().width + 20 : 360;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const nextLeft = Math.max(0, Math.min(track.scrollLeft + direction * scrollAmount, maxScrollLeft));

    track.scrollTo({ left: nextLeft, behavior: "smooth" });
    requestAnimationFrame(updateScrollState);
  }

  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.1)] lg:grid lg:grid-cols-[20rem_minmax(0,1fr)]">
      <aside className={`flex flex-col justify-between bg-[#0f2a46] p-7 text-center lg:p-9 lg:text-left ${styles.summary}`} aria-label="Cinco estrellas. 5.0 de valoración. +50 reseñas verificadas">
        <div>
          <div className={`text-sm font-black uppercase tracking-normal ${styles.summaryLabel}`}>Valoración media</div>
          <div className={`mt-6 text-7xl font-black leading-none ${styles.summaryMetric}`}>5.0</div>
          <div className="mt-4 flex justify-center gap-1 text-amber-400 lg:justify-start" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-current" strokeWidth={1.8} />
            ))}
          </div>
          <div className={`mt-4 text-lg font-black ${styles.summaryCount}`}>+50 reseñas verificadas</div>
        </div>
        <div className={`mt-10 border-t border-white/20 pt-6 text-xl font-black leading-tight ${styles.summaryTitle}`}>
          Opiniones que hablan de cómo trabajamos
        </div>
      </aside>

      <div className="min-w-0 bg-[#f8fafc] px-4 py-5 sm:px-6 sm:py-7">
        <div className="mb-3 flex justify-end gap-3" aria-label="Controles del carrusel de reseñas">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            onClick={() => move(-1)}
            disabled={!canScrollPrevious}
            aria-disabled={!canScrollPrevious}
            aria-label="Ver reseñas anteriores"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            onClick={() => move(1)}
            disabled={!canScrollNext}
            aria-disabled={!canScrollNext}
            aria-label="Ver más reseñas"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
          </button>
        </div>

        <div
          ref={trackRef}
          className="flex min-w-0 w-full gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scroll-px-4 px-1 py-2 pb-5 pr-4"
          tabIndex={0}
          aria-roledescription="carrusel"
          aria-label="Carrusel de reseñas verificadas"
          onScroll={updateScrollState}
        >
          {items.map((item, index) => {
            const isFeatured = index === 0;

            return (
              <article
                key={item.title}
                data-review-card
                data-featured-review={isFeatured ? "true" : undefined}
                className={`relative flex min-h-[22rem] w-[min(19rem,calc(100vw-3rem))] flex-none snap-start flex-col overflow-hidden rounded-lg border p-6 shadow-[0_14px_36px_rgba(15,23,42,0.08)] sm:w-[23rem] ${isFeatured ? "border-blue-600 bg-blue-600" : "border-slate-200 bg-white"}`}
                aria-label={`${index + 1} de ${items.length}: ${item.title}`}
              >
                <span className={`absolute right-5 top-0 font-serif text-8xl leading-none ${isFeatured ? "text-white/20" : "text-blue-100"}`} aria-hidden="true">“</span>
                <div className="relative flex gap-1 text-amber-400" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" strokeWidth={1.8} />
                  ))}
                </div>
                <h3 className={`relative mt-7 text-2xl font-black leading-tight ${isFeatured ? "text-white" : "text-slate-900"}`}>{item.title}</h3>
                <p className={`relative mt-4 text-base leading-7 ${isFeatured ? "text-blue-50" : "text-slate-600"}`}>{item.text}</p>
                <div className={`${styles.reviewAuthor} local-review-author mt-auto grid min-w-0 gap-1 border-t ${isFeatured ? "border-white/25" : "border-slate-200"}`}>
                  <div className={`text-sm font-black leading-5 ${isFeatured ? "text-white" : "text-slate-900"}`}>{item.company}</div>
                  <div className={`text-xs font-bold leading-5 ${isFeatured ? "text-blue-100" : "text-teal-700"}`}>{item.contactRole}</div>
                  <div className={`text-xs font-semibold leading-5 ${isFeatured ? "text-blue-100" : "text-slate-500"}`}>{item.sector}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
