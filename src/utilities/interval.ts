export function interval(fn: VoidFunction, ms = 100) {
  const ref = setInterval(fn, ms);
  const cancel = () => clearInterval(ref);
  return { cancel };
}
