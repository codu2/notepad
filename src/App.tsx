import { useState } from "react";
import styled from "@emotion/styled";
import Card from "./components/Card";
import Edit from "./components/Edit";
import useMemo from "./store/memoStore";

const CardContainer = styled.div`
  display: center;
  gap: 32px;
  flex-wrap: wrap;
  align-items: center;
`;

const PlusCard = styled.div`
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #707070;
  cursor: pointer;
  width: 80px;
  height: 80px;
  padding-top: 4px;
  margin: 80px;
`;

function App() {
  const [mode, setMode] = useState<"edit" | "view">("view");
  const { memoList, setSelectedIndex, clear } = useMemo();

  return (
    <>
      {mode === "view" && (
        <CardContainer>
          {memoList.map((memo, index) => (
            <Card
              key={index}
              title={memo.title}
              onClick={() => {
                setSelectedIndex(index);
                setMode("edit");
              }}
            />
          ))}
          <PlusCard
            onClick={() => {
              setSelectedIndex(null);
              setMode("edit");
            }}
          >
            +
          </PlusCard>
          <PlusCard
            onClick={() => {
              setSelectedIndex(null);
              clear();
            }}
          >
            c
          </PlusCard>
        </CardContainer>
      )}
      {mode === "edit" && <Edit setMode={setMode} />}
    </>
  );
}

export default App;
