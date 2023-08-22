export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen flex-col self-stretch bg-alabaster md:grid md:place-items-center">
      <div className="flex flex-1 flex-col items-start rounded-xl p-10 md:w-2/3 md:bg-white lg:w-1/4">
        {children}
      </div>
    </section>
  );
}
