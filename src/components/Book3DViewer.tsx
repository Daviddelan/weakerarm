import { useEffect, useState } from "react";
import bookCover from "@/assets/book-cover.jpg";
import bookModel from "@/assets/book.glb.asset.json";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "auto-rotate"?: boolean | string;
          "auto-rotate-delay"?: number | string;
          "rotation-per-second"?: string;
          "camera-controls"?: boolean | string;
          "disable-pan"?: boolean | string;
          "interaction-prompt"?: string;
          "shadow-intensity"?: string | number;
          "shadow-softness"?: string | number;
          exposure?: string | number;
          "touch-action"?: string;
          loading?: string;
          reveal?: string;
        },
        HTMLElement
      >;
    }
  }
}

export function Book3DViewer() {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <img
        src={bookCover}
        alt="The Value of the Weaker book cover"
        className="w-full h-auto object-cover rounded-2xl"
      />
    );
  }


  return (
    <div className="relative w-full" style={{ aspectRatio: "1024 / 1536" }}>
      {ready ? (
        <model-viewer
          src={bookModel.url}
          alt="Interactive 3D model of The Value of the Weaker"
          camera-controls
          auto-rotate
          auto-rotate-delay={1500}
          rotation-per-second="20deg"
          interaction-prompt="none"
          disable-pan
          shadow-intensity="1"
          shadow-softness="1"
          exposure="1"
          touch-action="pan-y"
          loading="eager"
          reveal="auto"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        />
      ) : null}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-8 w-8 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
        </div>
      )}
    </div>
  );
}

