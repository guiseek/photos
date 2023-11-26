type Fn = (...params: any[]) => Element;
type Ctor = new (...params: any[]) => Element;

export function h(tagFn: string | Fn | Ctor, props: object, ...nodes: Node[]) {
  const component = create(tagFn, props);

  component.append(...nodes.flatMap(add));

  return Object.assign(component, props);
}

function add(node: Node | string) {
  return typeof node === "string" ? new Text(node) : node;
}

function create(tagFn: string | Fn | Ctor, props: object): Element {
  if (typeof tagFn === "string") {
    return document.createElement(tagFn);
  }

  try {
    return (tagFn as Fn)(props);
  } catch {
    return new (tagFn as Ctor)(props);
  }
}
