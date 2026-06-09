import type { JSX } from "solid-js";

export default function ChatWrapper(props: { children?: JSX.Element }) {
    return (
          <div class="contents">
            <div 
              id={"menu-panel-l2"}
              style={{ flex: '69.4 1 0px', overflow: 'hidden' }}
              data-panel="" data-panel-group-id="_r_4_" data-panel-id="menu-panel-l2" data-panel-size="69.4">
              <div class="size-full">
                <div class="relative flex flex-col overflow-hidden min-w-0 bg-card size-full">
                  <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-secondary">
                    {props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
}