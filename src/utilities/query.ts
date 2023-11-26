type IDSelector = `#${string}`;
type AttrSelector = `[${string}]`;
type ClassSelector = `.${string}`;
type OperatorSelector = `>` | `~` | `+`;

type Selector = IDSelector | AttrSelector | ClassSelector;
type TagSelector<K extends keyof HTMLElementTagNameMap> = `${K}${Selector}`;

export function query<K extends keyof HTMLElementTagNameMap>(
  selector: `${Selector} ${K}`
): HTMLElementTagNameMap[K];
export function query<K extends keyof HTMLElementTagNameMap>(
  selector: `${Selector} ${OperatorSelector} ${TagSelector<K>}`
): HTMLElementTagNameMap[K];
export function query<K extends keyof HTMLElementTagNameMap>(
  selector: TagSelector<K>
): HTMLElementTagNameMap[K];
export function query<K extends keyof HTMLElementTagNameMap>(selector: K) {
  return document.querySelector<HTMLElementTagNameMap[K]>(selector);
}

export function queryAll<K extends keyof HTMLElementTagNameMap>(
  selector: `${Selector} ${K}`
): HTMLElementTagNameMap[K][];
export function queryAll<K extends keyof HTMLElementTagNameMap>(
  selector: `${Selector} ${OperatorSelector} ${TagSelector<K>}`
): HTMLElementTagNameMap[K][];
export function queryAll<K extends keyof HTMLElementTagNameMap>(
  selector: TagSelector<K>
): HTMLElementTagNameMap[K][];
export function queryAll<K extends keyof HTMLElementTagNameMap>(selector: K) {
  return Array.from(
    document.querySelectorAll<HTMLElementTagNameMap[K]>(selector)
  );
}
