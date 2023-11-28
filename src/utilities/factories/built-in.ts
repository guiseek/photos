import { ElementByTag, ElementTag, elementMap } from "../element-map";

interface ElementConstructor<K extends keyof HTMLElementTagNameMap> {
  new (
    params: Partial<HTMLElementTagNameMap[K]>,
    ...children: Node[]
  ): HTMLElementTagNameMap[K];
}

export function BuiltIn<K extends ElementTag>(name: K) {
  class El extends (elementMap[name] as typeof HTMLElement) {
    constructor(
      readonly props: Partial<ElementByTag<K>> = {},
      ...children: Node[]
    ) {
      super();
      Object.assign(this, props);
      this.append(...children);
    }
  }
  customElements.define(`w3c-${name}`, El, { extends: name });
  return El as unknown as ElementConstructor<K>;
}
