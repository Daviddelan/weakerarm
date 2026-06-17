import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type Ref,
} from "react";
import bookCover from "@/assets/book-cover.jpg";

const BOOK_MODEL_URL = "/models/weakerarm.glb";

type ModelViewerProps = HTMLAttributes<HTMLElement> & {
  src?: string;
  alt: string;
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
  ref?: Ref<HTMLElement>;
  style?: CSSProperties;
};

export function Book3DViewer() {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const modelViewerRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!ready) return;

    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleLoad = () => setLoaded(true);
    const handleError = () => setFailed(true);

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);
    viewer.setAttribute("camera-controls", "");
    viewer.setAttribute("auto-rotate", "");
    viewer.setAttribute("auto-rotate-delay", "1500");
    viewer.setAttribute("rotation-per-second", "20deg");
    viewer.setAttribute("interaction-prompt", "none");
    viewer.setAttribute("disable-pan", "");
    viewer.setAttribute("shadow-intensity", "1");
    viewer.setAttribute("shadow-softness", "1");
    viewer.setAttribute("exposure", "1");
    viewer.setAttribute("touch-action", "pan-y");
    viewer.setAttribute("loading", "eager");
    viewer.setAttribute("reveal", "auto");
    viewer.setAttribute("src", BOOK_MODEL_URL);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, [ready]);

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
      {ready
        ? createElement("model-viewer", {
            ref: modelViewerRef,
            alt: "Interactive 3D model of The Value of the Weaker",
            style: {
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            },
          } satisfies ModelViewerProps)
        : null}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-8 w-8 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
        </div>
      )}
    </div>
  );
}
