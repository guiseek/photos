export const create = <K extends keyof HTMLElementTagNameMap>(
  name: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
  ...children: Node[]
): HTMLElementTagNameMap[K] => {
  const el = document.createElement(name);
  el.append(...children);
  return Object.assign(el, props);
};
