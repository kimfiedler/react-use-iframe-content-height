# react-use-iframe-content-height

A React hook to poll an iframe for its content height. It will only work if the
parent and the source of the iframe are on the same domain.

## Usage:

```javascript
function MyIframe() {
  const [iframeRef, iframeHeight] = useIframeContentHeight();

  return (
    <iframe ref={iframeRef} height={iframeHeight} width="100%" src="/content" />
  );
}
```
