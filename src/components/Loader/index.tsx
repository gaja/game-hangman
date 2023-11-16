import { CSSProperties } from "react";

interface Loader {
  style: CSSProperties
  props?: unknown
}

export function Loader({ style, ...props }: Loader) {
  return (
    <div style={style} {...props}>
      <p>Loading...</p>
    </div>
  );
}
