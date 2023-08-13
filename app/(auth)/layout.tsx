export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid h-screen place-items-center bg-alabaster">
      <div className="flex w-1/4 flex-col items-start rounded-xl bg-white p-10">
        {children}
      </div>
    </section>
  );
}
