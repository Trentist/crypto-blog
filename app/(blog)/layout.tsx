import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-3 py-8 pt-40">
        {children}
      </main>
      <Footer />
    </div>
  );
}

