import { useState } from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import useMemo from "../store/memoStore";

const TitleInput = styled.input``;

const ContentsInput = styled.textarea`
  height: 360px;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

interface EditProps {
  setMode: (mode: "edit" | "view") => void;
}

const Edit = ({ setMode }: EditProps) => {
  const { selectedIndex, editMemo, addMemoList, memoList } = useMemo();

  const [title, setTitle] = useState(() => {
    if (Number.isInteger(selectedIndex)) {
      return memoList[selectedIndex as number].title;
    }
    return "";
  });
  const [contents, setContents] = useState(() => {
    if (Number.isInteger(selectedIndex)) {
      return memoList[selectedIndex as number].contents;
    }
    return "";
  });

  return (
    <EditContainer>
      <TitleInput
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <ContentsInput
        value={contents}
        onChange={(event) => setContents(event.currentTarget.value)}
      />
      <ButtonContainer>
        <Button onClick={() => setMode("view")}>뒤로가기</Button>
        <Button
          onClick={() => {
            if (!(title.length && contents.length)) {
              alert("제목과 내용을 모두 적어주세요.");
              return;
            }
            // title과 contents가 둘 다 비어있지 않은 상태가 아닐 때, 즉 둘 다 비어있거나 둘 중 하나라도 비어있는 상태일 때

            const memo = { title, contents };

            if (Number.isInteger(selectedIndex)) {
              editMemo(selectedIndex as number, memo);
            } else {
              addMemoList(memo);
            }

            alert("저장되었습니다.");
            setMode("view");
          }}
        >
          저장
        </Button>
      </ButtonContainer>
    </EditContainer>
  );
};

export default Edit;
