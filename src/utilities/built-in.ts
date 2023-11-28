export const builtIn = <K extends keyof HTMLElementTagNameMap>(name: K) => {
  return <T extends CustomElementConstructor>(target: T) => {
    customElements.define(`w3c-${name}`, target, { extends: name });
  };
};
