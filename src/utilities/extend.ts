export const extend = <K extends keyof HTMLElementTagNameMap>(
  name: string,
  inherit: K
) => {
  return <T extends CustomElementConstructor>(target: T) => {
    customElements.define(`w3c-${name}`, target, { extends: inherit });
  };
};
