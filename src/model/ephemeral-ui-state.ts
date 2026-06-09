const NS = 'chat.ephemeral';

export const ephemeralKey = {
  railCollapsed: `${NS}.rail.collapsed`,
  railWidth: `${NS}.rail.width`,
} as const;

const hasStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
};

const readRaw = (key: string): string | null => {
  if (!hasStorage()) {
    return null;
  }
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeRaw = (key: string, value: string): void => {
  if (!hasStorage()) {
    return;
  }
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Quota / disabled storage — silently ignore; ephemeral state is best-effort.
  }
};

const readBoolean = (key: string, fallback: boolean): boolean => {
  const raw = readRaw(key);
  if (raw === '1' || raw === 'true') {
    return true;
  }
  if (raw === '0' || raw === 'false') {
    return false;
  }
  return fallback;
};

const writeBoolean = (key: string, value: boolean): void => {
  writeRaw(key, value ? '1' : '0');
}

export const readRailCollapsed = (fallback = false): boolean => readBoolean(ephemeralKey.railCollapsed, fallback);

export const writeRailCollapsed = (value: boolean): void => {
  writeBoolean(ephemeralKey.railCollapsed, value);
};

// Rail width: in expanded mode the chef can drag-resize within a sensible
// range. Spec target is 280 px (compact 240 / comfortable 320); we clamp at
// read time so out-of-range values from older versions or hand-edited
// storage can't break the layout.
export const RAIL_WIDTH_MIN_PX = 200;
export const RAIL_WIDTH_MAX_PX = 540;
export const RAIL_WIDTH_DEFAULT_PX = 320;
// Round 12: 76 px wide so each filter chip / menu button can still render
// as a 44 × 44 icon square with 14 px outer padding either side
// (14 + 44 + 14 = 72; plus 2 px borders = 76). Every filter stays
// accessible without expanding the rail or opening the ⋯ menu — the main
// fix vs round 11 where collapsed rail hid every chip.
export const RAIL_WIDTH_COLLAPSED_PX = 76;

const clampRailWidth = (n: number): number => Math.max(RAIL_WIDTH_MIN_PX, Math.min(RAIL_WIDTH_MAX_PX, n));

export const readRailWidth = (fallback = RAIL_WIDTH_DEFAULT_PX): number => {
  const raw = readRaw(ephemeralKey.railWidth);
  if (raw === null) {
    return fallback;
  }
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? clampRailWidth(n) : fallback;
};

export const writeRailWidth = (value: number): void => {
  writeRaw(ephemeralKey.railWidth, String(clampRailWidth(value)));
};
