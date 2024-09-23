import LinkCards from "@/components/LinkCards";
import Footer from "@/components/Footer";
import ImageProfile from "@/components/ImageProfile"; // Adjust the import path as needed

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ImageProfile />
      <main className="flex flex-col flex-grow items-center justify-center">
        <LinkCards />
      </main>
      <Footer />
    </div>
  );
}
