import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext } from "react";

import { MessageContext } from "../context/message";
import Card from "../components/Card.jsx";
import Loading from "../components/Loading";

const memberDataFields = [
  {
    title: "Full Name (Arabic)",
    type: "text",
    name: "name-ar",
    dir: "rtl",
    pattern:
      "[-_. \
\u0620-\u063F\u0641-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\
\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0750-\u077F\
\u08A0\u08A2-\u08AC\uFB50-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\
\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]{1,30}",
  },
  {
    title: "Full Name (English)",
    type: "text",
    name: "name-en",
    pattern: "[a-zA-Z\\s]+",
  },
  {
    title: "Email",
    type: "email",
    name: "email",
  },
  {
    title: "Phone Number",
    type: "tel",
    name: "phone",
    pattern: "01[0,1,2,5][0-9]{8}",
  },
  {
    title: "Faculty / Grad",
    type: "text",
    name: "faculty",
    pattern: "[a-zA-Z\\s]+",
  },
  {
    title: "University / School",
    type: "text",
    name: "university",
    pattern: "[a-zA-Z\\s]+",
  },
  {
    title: "Academic Year",
    type: "number",
    name: "academicYear",
    min: 1,
    max: 6,
  },
];

export default function Home() {
  const teamDetails = useContext(MessageContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false); // Sending Data To Backend
  const [error, setError] = useState(""); // Backend Error
  const [teamName, setTeamName] = useState(""); // The Team's Name
  const [members, setMembers] = useState([]); // All Members of The Team

  const addMember = (e) => {
    e.preventDefault();
    const newMember = {
      name: {
        ar: e.target[0].value,
        en: e.target[1].value,
      },
      email: e.target[2].value,
      phone: e.target[3].value,
      faculty: e.target[4].value,
      university: e.target[5].value,
      academicYear: e.target[6].value,
      leader: !members.length,
    };

    if (
      members.length < 5 &&
      Object.values(Object.values(newMember)[0]).length == 2 &&
      Object.values(newMember).length == 7
    ) {
      setMembers((pre) => [...pre, newMember]);
      e.target[8].click();
    }
  };

  const deleteMember = (id) => {
    const newMembers = members.filter((_, i) => i != id);
    setMembers(newMembers);
  };

  const handleSubmit = async () => {
    const leader = members.filter((member) => member.leader);
    const others = members.filter((member) => !member.leader);

    setLoading(true);
    const result = await fetch("/api/member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...leader[0],
        teamName: teamName,
        members: others,
      }),
    }).then((res) => res.json());

    if (result.error) {
      setError("Error occur, Please Try Again Later.");
    } else {
      setLoading(false);
      teamDetails.setId(result.id);
      teamDetails.setTeamName(result.teamName);
      router.push("/message");
    }
  };

  return (
    <>
      <Head>
        <title>ARC7 - Phase 01 | APEL</title>
      </Head>

      <Loading
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
      />
      <div className="w-full flex flex-col justify-center items-center gap-3 mt-4">
        <div className="container text-center text-sm xs:text-lg sm:text-xl md:text-2xl font-bold">
          <h1 className="mb-8">
            Join
            <span className="text-main"> Aswan Practical Engineering Lab </span>
            Competition of{" "}
            <span className="text-black">The Line Follower.</span>
          </h1>

          <div className="w-full flex justify-center items-center gap-2">
            <label htmlFor="teamName">Team Name</label>
            <input
              type="text"
              name="teamName"
              id="teamName"
              placeholder=" "
              required
              onChange={(e) => setTeamName(e.target.value)}
              className="py-1 px-2 outline-none rounded shadow"
            />
          </div>
        </div>

        <section className="w-full max-w-7xl px-5 grid grid-cols-1 lg:grid-cols-[0.75fr_1fr] gap-4 mb-10">
          <Card>
            <div className="mb-4 md:mb-8">
              <div className="text-main text-center text-xl xs:text-3xl md:text-3xl font-bold">
                <h1>{`${members.length ? "Add A Member" : "Add A Leader"}`}</h1>
              </div>
            </div>
            <form
              onSubmit={addMember}
              encType="multipart/form-data"
              className="grow flex flex-col"
            >
              <div className="grow">
                {memberDataFields.map((field, i) => (
                  <div key={i} className="flex flex-col">
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder || " "}
                      required
                      pattern={field.pattern}
                      dir={field.dir}
                      min={field.min}
                      max={field.max}
                      className="peer w-full h-7 sm:h-8 md:h-9 p-2 mt-1 mb-4 md:mb-5 outline-none rounded border placeholder:text-sm valid:border-green-500 placeholder-shown:border-transparent placeholder-shown:border-main border-red-500 order-2 transition-colors duration-500"
                    />
                    <label
                      htmlFor={field.name}
                      className="peer-valid:text-green-500 peer-placeholder-shown:text-inherit peer-placeholder-shown:text-main text-red-500 order-1 transition-colors duration-500"
                    >
                      {field.title}
                    </label>
                  </div>
                ))}
              </div>
              <input
                type="submit"
                value={`${members.length ? "Add A Member" : "Add A Leader"}`}
                className="px-3 py-2 mt-3 rounded text-white cursor-pointer border border-main bg-main hover:bg-main-hover hover:shadow-md transition-colors duration-500"
              />
              <input
                type="reset"
                value="Clear"
                className="px-3 py-2 mt-3 rounded cursor-pointer border border-main text-main hover:shadow-md transition-all duration-500"
              />
            </form>
          </Card>

          <Card>
            <div className="mb-4 md:mb-8">
              <div className="text-main text-start text-xl xs:text-3xl md:text-3xl font-bold flex justify-between items-start">
                <p>{`${teamName ? teamName : "_"}'s`} Members</p>
                <p>{members.length}</p>
              </div>

              <div className="text-[11px] sm:text-sm text-start">
                <p>2 - 5 Members</p>
                <p>Make Sure All Data Is Correct.</p>
              </div>
            </div>
            <div className="grow">
              <div
                className={
                  members.length &&
                  "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                }
              >
                {members.length ? (
                  members.map((member, i) => (
                    <div
                      key={i}
                      className={`${
                        member.leader && "bg-main md:col-span-2 text-sm"
                      } container h-fit text-start text-black rounded-md border border-gray-200 text-[11px] relative`}
                    >
                      <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                        <p>
                          <span
                            className={`hidden ${
                              member.leader && "md:inline "
                            }`}
                          >
                            Full{" "}
                          </span>
                          Name
                          <span
                            className={`hidden ${
                              member.leader && "md:inline "
                            }`}
                          >
                            {" "}
                            (ar)
                          </span>
                        </p>
                        <p className="text-end truncate">{member.name.ar}</p>
                      </div>
                      <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                        <p>
                          <span
                            className={`hidden ${
                              member.leader && "md:inline "
                            }`}
                          >
                            Full{" "}
                          </span>
                          Name
                          <span
                            className={`hidden ${
                              member.leader && "md:inline "
                            }`}
                          >
                            {" "}
                            (en)
                          </span>
                        </p>
                        <p className="text-end truncate">{member.name.en}</p>
                      </div>
                      <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                        <p>Email</p>
                        <p className="text-end truncate">{member.email}</p>
                      </div>
                      <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                        <p>
                          Phone
                          <span
                            className={`hidden ${
                              member.leader && "md:inline "
                            }`}
                          >
                            {" "}
                            Number
                          </span>
                        </p>
                        <p className="text-end truncate">{member.phone}</p>
                      </div>
                      <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                        <p>
                          Faculty
                          <span
                            className={`hidden ${
                              member.leader && "md:inline "
                            }`}
                          >
                            {" "}
                            / Gard
                          </span>
                        </p>
                        <p className="text-end truncate">{member.faculty}</p>
                      </div>
                      <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                        <p>
                          University
                          <span
                            className={`hidden ${
                              member.leader && "md:inline "
                            }`}
                          >
                            {" "}
                            / School
                          </span>
                        </p>
                        <p className="text-end truncate">{member.university}</p>
                      </div>
                      <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                        <p>Academic Yaer</p>
                        <p className="text-end truncate">
                          {member.academicYear}
                        </p>
                      </div>
                      <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                        <p>Position</p>
                        <p className="text-end truncate">
                          {member.leader ? "Leader" : "Member"}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteMember(i)}
                        className={`w-6 h-6 cursor-pointer rounded-full hover:scale-110 absolute -top-2 -left-2 transition-all duration-200 ${
                          member.leader
                            ? "bg-white border border-main text-main"
                            : "text-white bg-main"
                        }`}
                      >
                        x
                      </button>
                    </div>
                  ))
                ) : (
                  <h1 className="text-center text-lg md:text-xl font-bold">
                    No Members Yet.
                  </h1>
                )}
              </div>
            </div>
            {members.length >= 2 && (
              <button
                disabled={loading || !teamName.length}
                onClick={handleSubmit}
                className="w-full rounded px-3 py-2 mt-3 text-white cursor-pointer border border-main bg-main hover:bg-main-hover hover:shadow-xl disabled:cursor-not-allowed transition-colors duration-500"
              >
                Send
              </button>
            )}
          </Card>
        </section>
      </div>
    </>
  );
}
