import { SafeUser } from '@/types';

const Header = ({ currentUser }: { currentUser: SafeUser }) => {
  return (
    <header className="flex lg:items-end bg-slate-100 items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5">
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900">{currentUser.name}</h2>
        <p className="text-base text-slate-500">Pantau semua pengguna dan konten Anda di sini</p>
      </div>

      {/*<p>Search</p>*/}
    </header>
  );
};
export default Header;
