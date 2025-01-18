'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center font-mono py-4 text-white">
      <p>
        Copyright &copy; {currentYear} -{' '}
        <a href="https://instagram.com/chndrwali" target="_blank" rel="noopener noreferrer" className="hover:underline">
          chndrwali
        </a>
      </p>
    </footer>
  );
};

export default Footer;
