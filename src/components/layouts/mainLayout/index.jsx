import Footer from './components/Footer';
import Header from './components/Header';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-10 bg-bgPrimary text-textBlackColor">
      <Header />
      <main className="flex-grow max-w-[1200px] mx-auto w-full">{children}</main>
      <Footer />
    </div>
  );
}
