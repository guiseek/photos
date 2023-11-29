export const delay = (fn: VoidFunction, ms = 1000) => {
  const timeout = setTimeout(fn, ms);

  const clear = () => clearTimeout(timeout);

  return { clear };
};
