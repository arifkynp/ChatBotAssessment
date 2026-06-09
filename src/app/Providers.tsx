import { type ParentComponent, lazy } from 'solid-js';
import { Portal } from 'solid-js/web';

import { Toast } from '@kobalte/core/toast';

import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

const Devtools = import.meta.env.DEV
  ? lazy(async () => {
      const m = await import('@tanstack/solid-query-devtools');
      return { default: m.SolidQueryDevtools };
    })
  : null;

export const Providers: ParentComponent = (props) => (
  <QueryClientProvider client={queryClient}>
    {props.children}

    <Portal>
      <Toast.Region>
        <Toast.List class="fixed inset-e-0 top-0 z-9999 m-0 box-border flex w-full max-w-sm list-none flex-col gap-2 p-4 outline-none [--viewport-padding:16px]" />
      </Toast.Region>
    </Portal>

    {Devtools && <Devtools initialIsOpen={false} />}
  </QueryClientProvider>
);
