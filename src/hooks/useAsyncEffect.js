import React from 'react';

export function useAsyncEffect(effect, deps) {
  React.useEffect(() => {
    let destroyHandler;

    (async () => {
      destroyHandler = await effect();
    })();

    return () => {
      if (destroyHandler instanceof Function) {
        destroyHandler();
      }
    };
  }, deps);
}
