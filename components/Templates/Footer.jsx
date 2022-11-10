import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t text-center border-gray-200">
      <div className="container py-3 md:py-5 font-bold tracking-widest">
        <div className="flex justify-between">
          <p>APEL Team | Aswan University</p>
          <p>
            Coded By{" "}
            <Link
              href="https://github.com/lamiaagabriel"
              target="_blank"
              className="hover:underline text-main"
            >
              Lamiaa Gabriel
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
