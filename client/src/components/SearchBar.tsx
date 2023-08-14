"use client";

import { useEffect, useState } from "react";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Command,
} from "./ui";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchAPI } from "@/api/search";
import { toast } from "@/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const { push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [prevSearchResults, setPrevSearchResults] = useState(null); // 이전에 검색한 결과 저장 변수

  // 디바운스를 구현하기 위한 타이머 상태 변수
  const [debounceTimer, setDebounceTimer] = useState<any>(null);

  // tanstack query search all
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["searchAllBlog"],
    queryFn: () => searchAPI.searchAllBlog(keyword),
    onError: () => {
      toast({
        title: "Failed to search Blog",
        //  @ts-ignore
        description: `${error?.response?.data?.message}`,
        variant: "destructive",
      });
    },
    enabled: false,
  });

  if (error) {
    toast({
      title: "Failed to search Blog",
      //  @ts-ignore
      description: `${error?.response?.data?.message}`,
      variant: "destructive",
    });
  }

  //   handleModal
  const handleEnter = (id: number) => {
    setIsModalOpen(false);
    push(`/blog/${id}`);
  };

  //   key down function
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && e.metaKey) {
      setIsModalOpen((open) => !open);
    }
  };

  // useeffect keydown
  useEffect(() => {
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // 디바운스를 위한 useEffect
  useEffect(() => {
    let timer: any;

    // 입력이 변경될 때마다 이전의 타이머를 취소하고 새로운 타이머를 설정
    clearTimeout(debounceTimer);

    // 입력이 변경된 후 500ms 이후에 요청을 보내도록 타이머 설정
    timer = setTimeout(() => {
      if (keyword) {
        refetch();
      }
    }, 500);

    // 타이머 상태 업데이트
    setDebounceTimer(timer);

    // cleanup 함수에서 이전 타이머를 취소하기 위해 반환
    return () => clearTimeout(timer);
  }, [keyword, refetch]);

  // useEffect를 사용하여 검색어가 변경될 때마다 이전 검색 결과를 초기화
  //   useEffect(() => {
  //     setPrevSearchResults(null);
  //   }, [keyword]);

  // 결과를 저장하는 변수를 따로 두고, 이전 검색 결과가 있는 경우에는 해당 결과를 사용하도록 조건 추가
  //   const searchResults = prevSearchResults || data;

  //   console.log(searchResults, "@@@@@@@@");

  return (
    <>
      {/* search bar button */}
      <Button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="w-60 mr-5 flex items-center justify-between"
      >
        <div className="text-gray-400">Search Blog...</div>
        <div>⌘ K</div>
      </Button>

      {/* command modal */}
      <CommandDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <CommandInput
          value={keyword}
          onValueChange={(value) => setKeyword(value)}
          placeholder="Type a Author or Title or Content search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup
            onChange={(data) => console.log(data)}
            heading="Suggestions"
          >
            {data?.length > 0 &&
              data?.map((item: any) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleEnter(item.id)}
                  tabIndex={0}
                >
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
