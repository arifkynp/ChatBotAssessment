import { useNavigate } from '@solidjs/router';
import { IconLogout, IconMonitor }  from '~/assets/Icons/Icons';

export type TNavbarWrapperProps = {
    userProfile: {
        image: string;
    };
}

export default function NavbarWrapper(props: Readonly<TNavbarWrapperProps>) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };


  return (
    <div class="group/panel relative h-full shrink-0 max-md:hidden">
      <div class="border-border bg-card scrollbar-hide flex h-full w-18 shrink-0 flex-col items-center gap-2 overflow-y-auto border-r py-4 font-sans">
        <div class="mb-4 flex flex-col items-center px-2">
          <div class="flex size-8 items-center justify-center">
            <IconMonitor class="text-foreground size-8" />
            <img src="./favicon.svg" alt="Logo" />
          </div>
        </div>
        <div class="flex-1"/>
        <div class="bg-border mb-2 h-px w-8"/>
        <div class="flex w-full flex-col items-center gap-1 px-2">
          <button class="relative size-10 cursor-pointer" onClick={handleLogout}>
            <IconLogout class="text-foreground size-8" />
          </button>
          <span class="text-muted-foreground text-center font-sans text-[10px] leading-tight">Logout</span>
        </div>
      </div>
    </div>
  );
}
