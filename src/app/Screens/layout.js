import Navbar from "../Components/Navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div>
      <Navbar />
      <section className="mx-24 my-24">
        {/* Include shared UI here e.g. a header or sidebar */}

        {children}
      </section>
    </div>
  );
}
