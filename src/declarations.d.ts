declare module '*.svg?component-solid' {
  import type { Component, ComponentProps } from 'solid-js';

  const value: Component<ComponentProps<'svg'>>;
  export default value;
}