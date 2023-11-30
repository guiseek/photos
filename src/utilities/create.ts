export const create = <K extends keyof HTMLElementTagNameMap>(
  name: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
  ...children: Node[]
): HTMLElementTagNameMap[K] => {
  const el = Object.assign(document.createElement(name), props);
  el.append(...children);

  if (props.style) {
    for (const [p, v] of Object.entries(props.style)) {
      el.style[p as any] = v as string;
    }
  }

  return el;
};
