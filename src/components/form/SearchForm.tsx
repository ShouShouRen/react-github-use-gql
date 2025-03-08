import React, { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

type SearchFormProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};
function SearchForm({ userName, setUserName }: SearchFormProps) {
  const [text, setText] = useState(userName);
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text == "") {
      toast.error("Please enter a username");
      return;
    }
    setUserName(text);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-x-2 full lg:w-1/3 mb-8"
    >
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        type="text"
        id="search"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Enter a GitHub username"
        className="flex-grow bg-background"
      />
      <Button type="submit" className="cursor-pointer">
        Search
      </Button>
    </form>
  );
}

export default SearchForm;
