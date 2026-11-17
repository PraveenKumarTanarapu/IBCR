"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EVENT_FILMS, type EventFilm } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Films from the Chamber's events.
 *
 * Nothing loads until someone presses play: `preload="none"` means the page
 * carries the weight of two poster frames rather than two films. A film that
 * has not been supplied yet shows its plate and says so, rather than a black
 * rectangle with broken controls.
 */
export function EventFilms({ divided = true }: { divided?: boolean }) {
  if (EVENT_FILMS.length === 0) return null;

  return (
    <Section id="films" divided={divided}>
      <div className="container-page">
        <SectionHeading
          eyebrow="On film"
          title="The evenings,"
          accent="as they happened."
          copy="A few minutes each — the room, the people in it and what was said."
        />

        <Reveal className="mt-12" y={22}>
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
            {EVENT_FILMS.map((film) => (
              <li key={film.id}>
                <Film film={film} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function Film({ film }: { film: EventFilm }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  const start = () => {
    const video = ref.current;
    if (!video) return;
    setPlaying(true);
    const playback = video.play();
    if (playback) playback.catch(() => undefined);
  };

  return (
    <figure className="group overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-white transition-[border-color] duration-500 hover:border-hairline-strong">
      <div className="relative aspect-video bg-navy-950">
        <video
          ref={ref}
          className={cn("size-full object-cover", missing && "invisible")}
          poster={film.poster}
          preload="none"
          playsInline
          controls={playing}
          onError={() => setMissing(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={film.src} type="video/mp4" />
        </video>

        {missing ? (
          <p className="label-mono absolute inset-0 grid place-items-center text-center text-white/50">
            Film to be added
          </p>
        ) : null}

        {!playing && !missing ? (
          <button
            type="button"
            onClick={start}
            aria-label={`Play ${film.title}`}
            className="absolute inset-0 grid cursor-pointer place-items-center bg-navy-950/25 transition-colors duration-500 hover:bg-navy-950/10"
          >
            <span className="grid size-16 place-items-center rounded-full bg-white/95 text-navy-900 shadow-[0_8px_30px_rgba(4,10,24,0.35)] transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-105">
              <Play strokeWidth={1.5} className="ml-0.5 size-6" aria-hidden />
            </span>
          </button>
        ) : null}
      </div>

      <figcaption className="border-t border-hairline p-5 md:p-6">
        <h3 className="text-[1.0625rem] leading-snug font-semibold tracking-tight text-navy-900">
          {film.title}
        </h3>
        <p className="label-mono mt-2 text-muted">{film.caption}</p>
      </figcaption>
    </figure>
  );
}
