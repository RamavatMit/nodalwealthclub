"use client";

import { useState } from "react";
import { MotionVisual } from "@/components/ui/motion-visual";
import type { Lesson } from "@/content/lessons";
import { cn } from "@/lib/utils";

function Player({ lesson, index }: { lesson: Lesson; index: number }) {
  const v = lesson.video;
  if (v?.kind === "file") {
    return (
      // Captions: add a <track kind="captions"> when the subtitle file arrives.
      <video
        key={lesson.id}
        src={v.src}
        poster={v.poster}
        controls
        preload="metadata"
        className="size-full bg-black"
      >
        Your browser can&apos;t play this video.
      </video>
    );
  }
  if (v?.kind === "youtube") {
    return (
      <iframe
        key={lesson.id}
        src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
        title={lesson.title}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="size-full"
      />
    );
  }
  return (
    <div className="relative size-full">
      <MotionVisual
        tone={index % 2 ? "linen" : "mint"}
        seed={index + 2}
        className="absolute inset-0 rounded-none"
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="border-forest/40 bg-paper/80 text-forest grid size-16 place-items-center rounded-full border">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path d="M5 3v12l10-6z" fill="currentColor" />
            </svg>
          </span>
          <p className="bg-paper/90 rounded-xs px-3 py-1.5 font-mono text-[0.68rem] tracking-wider uppercase">
            Video coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Video lessons as a playlist: the player on one side, lessons listed one
 * after another on the other. Lessons without a video show a placeholder.
 */
export function LessonPlaylist({ lessons, title }: { lessons: Lesson[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const lesson = lessons[current];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <div className="border-line bg-paper aspect-video overflow-hidden rounded-xs border">
          <Player lesson={lesson} index={current} />
        </div>
        <div className="mt-4">
          <p className="text-ink-muted font-mono text-[0.68rem] tracking-wider uppercase">
            Lesson {current + 1} of {lessons.length}
            {lesson.duration ? ` · ${lesson.duration}` : ""}
          </p>
          <h3 className="display mt-1 text-3xl">{lesson.title}</h3>
          <p className="text-ink-muted mt-2">{lesson.summary}</p>
        </div>
      </div>

      <ol
        aria-label={`${title} playlist`}
        className="border-line divide-line max-h-[34rem] divide-y overflow-y-auto rounded-xs border"
        data-lenis-prevent
      >
        {lessons.map((l, i) => (
          <li key={l.id}>
            <button
              type="button"
              onClick={() => setCurrent(i)}
              aria-current={i === current ? "true" : undefined}
              className={cn(
                "flex w-full items-start gap-4 px-4 py-4 text-left transition-colors",
                i === current ? "bg-forest/10" : "bg-paper hover:bg-ivory",
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-xs border font-mono text-xs",
                  i === current ? "border-forest bg-forest text-paper" : "border-line",
                )}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{l.title}</span>
                <span className="text-ink-muted mt-0.5 block text-sm">{l.summary}</span>
              </span>
              <span className="text-ink-muted shrink-0 font-mono text-[0.65rem] uppercase">
                {l.video ? (l.duration ?? "Play") : "Soon"}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
