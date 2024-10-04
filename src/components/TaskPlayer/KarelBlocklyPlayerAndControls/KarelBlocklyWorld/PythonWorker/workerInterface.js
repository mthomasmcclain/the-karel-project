const pythonWorker = new Worker(new URL('./pythonWorker.js', import.meta.url), {
  type: 'module'
});

const callbacks = {};

pythonWorker.onmessage = (event) => {
  const { id, ...data } = event.data;
  const onSuccess = callbacks[id];
  delete callbacks[id];
  onSuccess(data);
};

const asyncRun = (() => {
  let id = 0;
  return (script, context) => {
    id = (id + 1) % Number.MAX_SAFE_INTEGER;
    return new Promise((onSuccess) => {
      callbacks[id] = onSuccess;
      pythonWorker.postMessage({
        ...context,
        python: script,
        id
      });
    });
  };
})();

export { asyncRun };
