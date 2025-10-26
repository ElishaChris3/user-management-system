export default function Footer() {
  return (
    <footer className="border-t mt-10 bg-white/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-4 text-sm text-gray-500 gap-2 md:gap-0">
        <p>© {new Date().getFullYear()} User Management System</p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Next.js
          </a>{" "}
          &{" "}
          <a
            href="https://www.prisma.io"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Prisma
          </a>
        </p>
      </div>
    </footer>
  );
}
