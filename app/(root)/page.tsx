'use client';

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from '@/hooks/use-toast';

export default function Home() {
  const [ConfirmDialog, confirm] = useConfirm('Apakah kamu yakin?', 'Anda akan keluar akun.');
  const handleLogout = async () => {
    const ok = await confirm();
    if (ok) {
      logout();
      toast({
        title: 'Berhasil',
        description: 'Berhasil keluar akun',
        variant: 'success',
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Button onClick={handleLogout}>Logout</Button>{' '}
      {/* <IKImage
          path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        /> */}
    </>
  );
}
