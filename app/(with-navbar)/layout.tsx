import Navbar from "./_components/navbar";

interface WithNavbarLayoutProps {
  children: React.ReactNode;
}

export default function WithNavbarLayout({ children }: WithNavbarLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
