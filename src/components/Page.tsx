import Footer from "./Footer";
import Navbar from "./Navbar";

interface PageProps {
  children: React.ReactNode;
  title?: string;
  userName?: string;
}

export default function Page({
  children,
  title = "",
}: PageProps) {
  return (
    <>
      <title>Chat App - {title}</title>
      <div className="flex flex-col min-h-screen bg-primary-400">
        <Navbar />
        <main className="flex flex-grow mx-auto px-4 sm:px-6 lg:px-8 py-8 container">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
