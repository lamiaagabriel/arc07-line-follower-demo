import Link from "next/link";
import Image from "next/legacy/image";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex justify-between items-center gap-2">
        <Link href="/" className="w-12 xs:w-16 md:w-24">
          <Image
            src="/apel-logo.png"
            alt="APEL LOGO"
            width={1}
            height={1.1}
            layout="responsive"
          />
        </Link>

        <h1 className="text-center text-sm xs:text-lg sm:text-xl md:text-4xl">
          <span className="block md:inline-block md:mr-4 font-bold text-main">
            ARC7
          </span>
          <span>PHASE 01</span>
        </h1>

        <Link
          href="https://eng.aswu.edu.eg/"
          target="_blank"
          className="w-12 xs:w-16 md:w-24"
        >
          <Image
            src="/eng-logo.png"
            alt="APEL LOGO"
            width={1}
            height={1.1}
            layout="responsive"
          />
        </Link>
      </div>
    </header>
  );
}
