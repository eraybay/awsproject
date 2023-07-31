import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div>
      <section className="mx-24 my-8">
        {/* Include shared UI here e.g. a header or sidebar */}

        {children}
      </section>
    </div>
  );
}
