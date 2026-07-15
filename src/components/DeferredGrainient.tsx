import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import type GrainientComponent from "./Grainient";

const Grainient = lazy(() => import("./Grainient"));

type DeferredGrainientProps = ComponentProps<typeof GrainientComponent>;

function DeferredGrainient(props: DeferredGrainientProps) {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(boundary);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boundaryRef} className="deferred-grainient">
      {shouldLoad ? (
        <Suspense fallback={null}>
          <Grainient {...props} />
        </Suspense>
      ) : null}
    </div>
  );
}

export default DeferredGrainient;
