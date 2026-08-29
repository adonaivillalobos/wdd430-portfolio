export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Adonai Villalobos. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}