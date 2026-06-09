import { type JSX, Show, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { IconThreeDots } from '~/assets/Icons/Icons';

import {
  RAIL_WIDTH_COLLAPSED_PX,
  RAIL_WIDTH_MAX_PX,
  RAIL_WIDTH_MIN_PX,
  readRailCollapsed,
  readRailWidth,
  writeRailWidth,
} from '~/model/ephemeral-ui-state';

export type TSidebarWrapperProps = {
  children?: JSX.Element;
};

export default function SidebarWrapper(props: Readonly<TSidebarWrapperProps>) {
  const [railCollapsed] = createSignal(readRailCollapsed());
  const [railWidth, setRailWidth] = createSignal(readRailWidth());
  const railEffectiveWidth = createMemo<number>(() => (railCollapsed() ? RAIL_WIDTH_COLLAPSED_PX : railWidth()));

  return (
    <div class="contents">
      <div
        class=""
        id="sidebar-panel-l2"
        style={{ width: `${String(railEffectiveWidth())}px`, overflow: 'hidden' }}
        data-panel=""
        data-panel-group-id="_r_4_"
        data-panel-id="sidebar-panel-l2"
        data-panel-size={railEffectiveWidth()}
      >
        <div class="size-full">
          <div class="border-border flex size-full flex-col border-b">
            <div class="bg-secondary flex h-full flex-col px-2 pt-4 pb-2 font-sans">{props.children}</div>
          </div>
        </div>
      </div>

      <Show when={!railCollapsed()}>
        <RailResizeHandle
          headerPosition={'left'}
          width={railWidth()}
          onChange={(w) => {
            setRailWidth(w);
            writeRailWidth(w);
          }}
        />
      </Show>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Rail resize handle
// ---------------------------------------------------------------------------

export function RailResizeHandle(
  props: Readonly<{
    headerPosition: 'left' | 'right';
    width: number;
    onChange: (next: number) => void;
  }>,
) {
  let handleEl: HTMLDivElement | undefined;
  // Drag state is mutated outside Solid's reactivity — the handle just
  // reports the final width to the parent, which writes it back into the
  // signal + localStorage.
  let dragStartX = 0;
  let dragStartWidth = 0;

  const onPointerMove = (e: PointerEvent): void => {
    const dx = e.clientX - dragStartX;
    // For left-dock, dragging right widens. For right-dock, dragging left widens.
    const delta = props.headerPosition === 'left' ? dx : -dx;
    const next = Math.max(RAIL_WIDTH_MIN_PX, Math.min(RAIL_WIDTH_MAX_PX, dragStartWidth + delta));
    props.onChange(next);
  };

  const onPointerUp = (e: PointerEvent): void => {
    handleEl?.releasePointerCapture(e.pointerId);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  const onPointerDown = (e: PointerEvent): void => {
    if (e.button !== 0 || !handleEl) {
      return;
    }
    e.preventDefault();
    dragStartX = e.clientX;
    dragStartWidth = props.width;
    handleEl.setPointerCapture(e.pointerId);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  onMount(() => {
    handleEl?.addEventListener('pointerdown', onPointerDown);
  });

  onCleanup(() => {
    handleEl?.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  });

  return (
    <div
      class="bg-black hover:bg-primary/20 relative flex w-px shrink-0 items-center justify-center transition-colors"
      tabindex="0"
      data-panel-group-direction="horizontal"
      data-panel-group-id="_r_4_"
      data-resize-handle=""
      data-resize-handle-state="hover"
      data-panel-resize-handle-enabled="true"
      data-panel-resize-handle-id="_r_6_"
      aria-controls="sidebar-panel-l2"
      ref={handleEl}
      role="separator"
      aria-orientation="vertical"
      aria-valuemin={RAIL_WIDTH_MIN_PX}
      aria-valuemax={RAIL_WIDTH_MAX_PX}
      aria-valuenow={props.width}
    >
      <div class="absolute z-50 rounded px-0 py-1.5">
        <div class="relative z-50 size-4 text-white cursor-move bg-black rounded">
            <IconThreeDots class="size-4" />
        </div>
      </div>
    </div>
  );
}
