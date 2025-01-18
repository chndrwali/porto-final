import ContactSection from '@/components/root/contact/contactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

const Page = () => {
  return (
    <>
      <ContactSection />
    </>
  );
};

export default Page;
