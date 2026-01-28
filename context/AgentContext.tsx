import { createContext, useState } from "react";

interface AgentProps {
  agentName: string;
  emoji: string;
  initialPrompt: string;
}

interface AgentContextType {
  createdAgentData: AgentProps[];
  getAgentData: (newAgent: AgentProps) => void;
}

export const AgentContext = createContext<AgentContextType>({
  createdAgentData: [],
  getAgentData: () => {},
});

const initialData: AgentProps[] = [
  {
    agentName: "Diet Planner",
    emoji: "🥗",
    initialPrompt: "You are a professional Diet planner",
  },
];

export const AgentProvider = ({ children }: any) => {
  const [createdAgentData, setCreatedAgentData] = useState<AgentProps[]>(initialData);

  const getAgentData = (newAgent: AgentProps) => {
    setCreatedAgentData((prev) => [...prev, newAgent]);
  };

  const contextValue: AgentContextType = {
    createdAgentData,
    getAgentData,
  };

  return <AgentContext.Provider value={contextValue}>{children}</AgentContext.Provider>;
};

export default AgentProvider;
