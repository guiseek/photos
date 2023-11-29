/// <reference types="vite/client" />

declare const main: HTMLElement;

declare namespace JSX {
  type IntrinsicElements = {
    [K in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[K]>;
  };
}

interface UpdateCallback {
  (): Promise<void>;
}

interface ViewTransition {
  readonly updateCallbackDone: Promise<void>;
  readonly ready: Promise<void>;
  readonly finished: Promise<void>;
  skipTransition(): void;
}

interface Document {
  startViewTransition(updateCallback?: UpdateCallback): ViewTransition;
}

interface Photo {
  path: string;
  time: string;
}