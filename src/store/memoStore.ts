import create from "zustand";
import Memo from "../interfaces/Memo";

interface MemoState {
  memoList: Memo[];
  selectedIndex: number | null;
  addMemoList: (memo: Memo) => void;
  clear: () => void;
  editMemo: (idx: number, memo: Memo) => void;
  setSelectedIndex: (idx: number | null) => void;
}

const useMemo = create<MemoState>((set) => ({
  memoList: JSON.parse((localStorage.getItem("memo.memoList") ?? null)!) ?? [],
  selectedIndex: null,
  addMemoList: (memo: Memo) => {
    set((prev) => {
      const memoList = [...prev.memoList, memo];
      localStorage.setItem("memo.memoList", JSON.stringify(memoList));
      return { memoList };
    });
  },
  clear: () => {
    set({
      memoList: [],
    });
    localStorage.setItem("memo.memoList", "[]");
  },
  editMemo: (idx: number, memo: Memo) => {
    set(({ memoList }) => {
      memoList[idx] = memo;
      localStorage.setItem("memo.memoList", JSON.stringify(memoList));
      return { memoList };
    });
  },
  setSelectedIndex: (idx: number | null) => {
    set({
      selectedIndex: idx,
    });
  },
}));

export default useMemo;
