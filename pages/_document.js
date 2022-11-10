import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="text-[11px] xs:text-sm sm:text-base bg-gray-50 text-slate-600 font-mono relative">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
