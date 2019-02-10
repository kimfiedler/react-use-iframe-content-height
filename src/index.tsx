import { useRef, useEffect, useState } from "react";

type CallbackFn = () => void;

function useInterval(callback: CallbackFn, interval: number) {
  const savedCallback = useRef<CallbackFn>(() => callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (interval !== null) {
      let id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
}

export default function useIframeContentHeight(
  interval: number = 250
): [React.MutableRefObject<HTMLIFrameElement | null>, number] {
  const iframeRef: React.MutableRefObject<HTMLIFrameElement | null> = useRef(
    null
  );
  const [iframeHeight, setIframeHeight] = useState(0);

  useInterval(() => {
    try {
      const iframe = iframeRef.current;
      const newHeight = iframe!.contentWindow!.document.body.scrollHeight;
      setIframeHeight(newHeight);
    } catch (_) {}
  }, interval);

  return [iframeRef, iframeHeight];
}
