import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { FIRM_INFO, TESTIMONIALS } from '../data/firmContent';
import { interpolateCount, prefersReducedMotion } from '../utils/motion';
import { Reveal } from './Reveal';

export function SocialProofSection() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [animatedCount, setAnimatedCount] = useState<number>(FIRM_INFO.googleReviewCount);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const node = counterRef.current;
    if (
      !node ||
      hasAnimatedRef.current ||
      prefersReducedMotion() ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setAnimatedCount(FIRM_INFO.googleReviewCount);
      return;
    }

    let rafId = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || hasAnimatedRef.current) {
          return;
        }
        hasAnimatedRef.current = true;
        observer.disconnect();

        const durationMs = 900;
        const start = performance.now();
        setAnimatedCount(0);

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / durationMs);
          setAnimatedCount(interpolateCount(FIRM_INFO.googleReviewCount, progress));
          if (progress < 1) {
            rafId = window.requestAnimationFrame(tick);
          }
        };

        rafId = window.requestAnimationFrame(tick);
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="avaliacoes" className="bg-[#F8F7F4] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left sticky Google Meu Negócio reputation anchor */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#87682A]">
              Avaliações Reais no Google
            </p>
            <h2 className="mt-3 font-serif text-[28px] leading-[1.18] font-medium text-[#1E293B] text-balance sm:text-[36px]">
              O reconhecimento de quem confiou sua causa ao escritório.
            </h2>

            {/* Google Meu Negócio highlight box with hairline border */}
            <div ref={counterRef} className="mt-8 border border-[#DED9CE] bg-[#F3F1ED] p-7">
              <div className="flex items-center justify-between gap-4 border-b border-[#DED9CE] pb-5">
                <div>
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#475569]">
                    Google Meu Negócio
                  </p>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="font-serif text-[44px] leading-none font-medium text-[#1E293B] tabular-nums">
                      {FIRM_INFO.googleRating}
                    </span>
                    <div>
                      <div
                        className="flex items-center gap-1 text-[#B08D48]"
                        aria-label={`Avaliação máxima de ${FIRM_INFO.googleRating} estrelas baseada em ${FIRM_INFO.googleReviewCount} avaliações no Google`}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className="h-4 w-4 fill-[#C5A059] text-[#C5A059]"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-xs font-medium text-[#475569] tabular-nums">
                        {animatedCount} avaliações · 100% nota máxima
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[13px] font-medium text-[#475569]">
                Destaques citados pelos clientes:{' '}
                <span className="text-[#1E293B]">{FIRM_INFO.googleTopTags}</span>
              </p>

              {/* Real compact office photos from Google Reviews */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {FIRM_INFO.officePhotos.map((photo) => (
                  <figure key={photo.src} className="group">
                    <div className="aspect-[6/5] w-full overflow-hidden border border-[#DED9CE] bg-[#0B192C] transition-colors duration-300 group-hover:border-[#C5A059]/70">
                      {!failedImages[photo.src] ? (
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [photo.src]: true }))
                          }
                          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-end p-2 text-xs text-[#CBD5E1]">
                          {photo.caption}
                        </div>
                      )}
                    </div>
                    <figcaption className="mt-1.5 text-[11.5px] text-[#475569] transition-colors duration-200 group-hover:text-[#1E293B]">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <a
                href={FIRM_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 border border-[#0B192C] px-5 py-3 text-[15px] font-semibold text-[#0B192C] transition-all duration-200 hover:bg-[#0B192C] hover:text-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B192C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F1ED]"
              >
                <span>Ver todas as {FIRM_INFO.googleReviewCount} avaliações no Google</span>
                <ExternalLink
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>

          {/* Right column: 4 real Google testimonials separated by 1px hairlines */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-[#DED9CE] border-y border-[#DED9CE]">
              {TESTIMONIALS.map((item, index) => (
                <Reveal key={item.id} delay={index * 70}>
                  <article className="group border-l-2 border-transparent py-7 pl-0 transition-all duration-300 first:pt-2 hover:border-[#C5A059] hover:pl-4 sm:py-9">
                    <div
                      className="flex items-center gap-1 text-[#C5A059]"
                      aria-label="5 estrelas"
                    >
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-3.5 w-3.5 fill-[#C5A059] text-[#C5A059]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <blockquote className="mt-3.5 font-serif text-[19px] leading-[1.52] text-[#1E293B] sm:text-[21px]">
                      “{item.quote}”
                    </blockquote>

                    <footer className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px]">
                      <span className="font-semibold text-[#1E293B]">{item.author}</span>
                      <span aria-hidden="true" className="text-[#87682A]">·</span>
                      <span className="text-[#475569]">{item.meta}</span>
                    </footer>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
