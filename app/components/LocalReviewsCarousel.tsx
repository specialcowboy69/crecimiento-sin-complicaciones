"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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
    const scrollAmount = card ? card.getBoundingClientRect().width + 16 : 360;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const nextLeft = Math.max(0, Math.min(track.scrollLeft + direction * scrollAmount, maxScrollLeft));

    track.scrollTo({ left: nextLeft, behavior: "smooth" });
    requestAnimationFrame(updateScrollState);
  }

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[18rem_1fr]">
      <aside
        className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-[0_14px_36px_rgba(15,23,42,0.08)]"
        aria-label="Cinco estrellas. 5.0 de valoración. +50 reseñas verificadas"
      >
        <div className="text-sm font-black uppercase tracking-normal text-teal-700">Valoración media</div>
        <div className="mt-6 text-6xl font-black leading-none text-slate-900">5.0</div>
        <div className="mt-4 flex justify-center gap-1 text-amber-400" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-5 w-5 fill-current" strokeWidth={1.8} />
          ))}
        </div>
        <div className="mt-4 text-lg font-black text-slate-900">+50 reseñas verificadas</div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Opiniones de clientes que han trabajado su presencia en Google, la web y el contenido con nosotros.
        </p>
      </aside>

      <div className="min-w-0">
        <div
          ref={trackRef}
          className="flex min-w-0 w-full gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scroll-px-4 px-2 py-2 pb-6 pr-4"
          tabIndex={0}
          aria-roledescription="carrusel"
          aria-label="Carrusel de reseñas verificadas"
          onScroll={updateScrollState}
        >
          {items.map((item, index) => (
            <article
              key={item.title}
              data-review-card
              className="flex min-h-[23rem] w-[min(18rem,calc(100vw-2rem))] flex-none snap-start flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.08)] sm:w-[21rem] lg:w-[23rem]"
              aria-label={`${index + 1} de ${items.length}: ${item.title}`}
            >
              <div className="flex gap-1 text-amber-400" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" strokeWidth={1.8} />
                ))}
              </div>
              <h3 className="mt-6 text-2xl font-black leading-tight text-slate-900">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{item.text}</p>
              <div className="local-review-author mt-auto grid min-w-0 gap-1 rounded-lg border border-[#dbe3ef] bg-slate-50 p-4">
                <div className="text-sm font-black leading-5 text-slate-900">{item.company}</div>
                <div className="text-xs font-bold leading-5 text-teal-700">{item.contactRole}</div>
                <div className="text-xs font-semibold leading-5 text-slate-500">{item.sector}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-3 flex gap-3" aria-label="Controles del carrusel de reseñas">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            onClick={() => move(-1)}
            disabled={!canScrollPrevious}
            aria-disabled={!canScrollPrevious}
            aria-label="Ver reseñas anteriores"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            onClick={() => move(1)}
            disabled={!canScrollNext}
            aria-disabled={!canScrollNext}
            aria-label="Ver más reseñas"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
