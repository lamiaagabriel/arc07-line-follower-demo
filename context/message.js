import { createContext, useState } from "react";

export const MessageContext = createContext();
export const MessageContextProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [teamName, setTeamName] = useState("");

  return (
    <MessageContext.Provider value={{ id, setId, teamName, setTeamName }}>
      {children}
    </MessageContext.Provider>
  );
};
