import Link from "next/link";
import Head from "next/head";
import { useContext } from "react";

import { MessageContext } from "../context/message";

export default function Message() {
  const teamDetails = useContext(MessageContext);

  return (
    <>
      <Head>
        <title>Thank You | APEL</title>
      </Head>
      <div className="container grow flex flex-col justify-center items-center gap-4">
        {teamDetails.teamName && teamDetails.id && (
          <>
            <h1 className="text-5xl sm:text-7xl md:text-8xl text-main text-center font-shadowsIntoLight font-semibold">
              Thank You, {teamDetails.teamName}!
            </h1>
            <div className="flex flex-col justify-center items-center my-2">
              <p className="bg-white w-full text-center text-main text-lg xs:text-2xl md:text-3xl px-3 py-2 sm:px-5 sm:py-3 border shadow-sm">
                {teamDetails.id}
              </p>
              <p className="text-[11px] uppercase">Screenshot your id</p>
            </div>

            <p className="text-center md:text-lg">
              Thanks for joining APEL competition of
              <span className="text-black font-semibold">
                {" "}
                The Line Follower{" "}
              </span>
              this year. <br /> We {`can't`} wait to see your creativity.
            </p>
          </>
        )}
        <Link
          href="/"
          className="ml-2 px-5 py-2 md:px-7 md:py-3 cursor-pointer bg-white border border-main text-main hover:shadow-lg transition-all duration-500"
        >
          Register A {teamDetails.teamName && teamDetails.id && "New"} Team
        </Link>
      </div>
    </>
  );
}
