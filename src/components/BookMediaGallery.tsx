import { useEffect, useRef, useState } from "react";
import { Play, X, Box } from "lucide-react";
import { Book3DViewer } from "./Book3DViewer";
import bookCover from "@/assets/book-cover.jpg";

const VIDEO_URL =
  "https://firebasestorage.googleapis.com/v0/b/weakerarm-fa8cb.firebasestorage.app/o/weakerarm.mp4?alt=media&token=6c4e6066-c502-4601-8f70-9639f671f37b";

type MediaType = "model" | "video";

export function BookMediaGallery() {
  const [active, setActive] = useState<MediaType>("model");
  const [fullscreen, setFullscreen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Pause video when switching away
  useEffect(() => {
    if (active !== "video" && videoRef.current) {
      videoRef.current.pause();
    }
  }, [active]);

  // Modal: ESC close + focus
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    document.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      if (modalVideoRef.current) modalVideoRef.current.pause();
    };
  }, [fullscreen]);

  return (
    <div className="w-full">
      {/* Main media display */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-cream-soft/40"
        style={{ aspectRatio: "1024 / 1536" }}
      >
        <div className={active === "model" ? "absolute inset-0" : "absolute inset-0 invisible pointer-events-none"}>
          <Book3DViewer />
        </div>

        {active === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/5">
            {videoFailed ? (
              <div className="text-center p-6">
                <p className="text-sm text-navy/70">Video preview is currently unavailable.</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                src={VIDEO_URL}
                controls
                playsInline
                preload="metadata"
                aria-label="Book preview video for The Value of the Weaker"
                onError={() => setVideoFailed(true)}
                onDoubleClick={() => setFullscreen(true)}
                className="w-full h-full object-contain bg-black rounded-2xl shadow-lg"
              />
            )}
            {!videoFailed && (
              <button
                onClick={() => setFullscreen(true)}
                aria-label="Open video fullscreen"
                className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-navy-deep/70 text-cream text-xs font-medium hover:bg-navy-deep transition-colors"
              >
                Fullscreen
              </button>
            )}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 justify-center lg:justify-start">
        <button
          type="button"
          onClick={() => setActive("model")}
          aria-label="View 3D book model"
          aria-pressed={active === "model"}
          className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${active === "model"
              ? "border-gold ring-2 ring-gold/30"
              : "border-border hover:border-gold/50"
            }`}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/weakerarm-fa8cb.firebasestorage.app/o/weakerarm.png?alt=media&token=ae96d2bc-d730-4adc-923d-023f287b218b"
            alt=""
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-x-0 bottom-0 bg-navy-deep/80 text-cream text-[9px] font-semibold uppercase tracking-wider py-0.5 flex items-center justify-center gap-1">
            <Box className="h-2.5 w-2.5" /> 3D
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActive("video")}
          aria-label="View book preview video"
          aria-pressed={active === "video"}
          className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 transition-all bg-navy-deep ${active === "video"
              ? "border-gold ring-2 ring-gold/30"
              : "border-border hover:border-gold/50"
            }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-7 w-7 rounded-full bg-cream/90 flex items-center justify-center">
              <Play className="h-3.5 w-3.5 text-navy-deep fill-navy-deep ml-0.5" />
            </span>
          </div>
          <span className="absolute inset-x-0 bottom-0 bg-navy-deep/90 text-cream text-[9px] font-semibold uppercase tracking-wider py-0.5 text-center">
            Video
          </span>
        </button>
      </div>

      {/* Fullscreen modal */}
      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setFullscreen(false);
          }}
        >
          <button
            ref={closeBtnRef}
            onClick={() => setFullscreen(false)}
            aria-label="Close video"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            ref={modalVideoRef}
            src={VIDEO_URL}
            controls
            autoPlay
            playsInline
            aria-label="Book preview video for The Value of the Weaker Arm"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
