"use client";

import { useEffect, useRef, useState } from "react";
import { BASE_PATH } from "@/lib/basePath";

const VIDEOS = [
  `${BASE_PATH}/videos/hero-1.mp4`,
  `${BASE_PATH}/videos/hero-2.mp4`,
  `${BASE_PATH}/videos/hero-3.mp4`,
];
const POSTER = `${BASE_PATH}/images/hero-poster.jpg`;
const FADE_DURATION_MS = 5000;

export default function HeroVideoBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Only the initially-active layer loads on first paint; other layers'
  // (small, re-encoded) sources are fetched only once they're about to be
  // shown, so the browser isn't asked to fetch all three videos concurrently.
  const [loadedIndices, setLoadedIndices] = useState(() => new Set([0]));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const advance = () => {
    if (reducedMotion) return;
    setActiveIndex((i) => {
      const next = (i + 1) % VIDEOS.length;
      setLoadedIndices((prev) => (prev.has(next) ? prev : new Set(prev).add(next)));
      return next;
    });
  };

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden border border-cv-border">
      {VIDEOS.map((src, i) => (
        <VideoLayer
          key={src}
          src={src}
          poster={POSTER}
          active={reducedMotion ? i === 0 : i === activeIndex}
          shouldLoad={reducedMotion ? i === 0 : loadedIndices.has(i)}
          onNearEnd={advance}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
    </div>
  );
}

function VideoLayer({
  src,
  poster,
  active,
  shouldLoad,
  onNearEnd,
}: {
  src: string;
  poster: string;
  active: boolean;
  shouldLoad: boolean;
  onNearEnd: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    if (active) {
      firedRef.current = false;
      video.play().catch(() => {});
      return;
    }
    const timeout = setTimeout(() => {
      video.pause();
      video.currentTime = 0;
    }, FADE_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [active, shouldLoad]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !active || firedRef.current) return;
    if (!video.duration || !Number.isFinite(video.duration)) return;
    if (video.duration - video.currentTime <= FADE_DURATION_MS / 1000) {
      firedRef.current = true;
      onNearEnd();
    }
  };

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      preload={active ? "auto" : "none"}
      autoPlay
      muted
      playsInline
      onTimeUpdate={handleTimeUpdate}
      onEnded={onNearEnd}
      className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
      style={{
        transitionDuration: `${FADE_DURATION_MS}ms`,
        opacity: active ? 1 : 0,
      }}
    />
  );
}
