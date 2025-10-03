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
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-32 sm:pt-36 lg:pt-40">
        {children}
      </main>
      <Footer />
    </div>
  );
}

