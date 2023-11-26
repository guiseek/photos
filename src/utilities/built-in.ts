export const builtIn = <K extends keyof HTMLElementTagNameMap>(name: K) => {
  return <T extends CustomElementConstructor>(target: T) => {
    customElements.define(`tsx-${name}`, target, { extends: name });
  };
};
