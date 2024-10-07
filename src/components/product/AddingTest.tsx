import autoAnimate from "@formkit/auto-animate";
import React, { useEffect, useRef, useState } from "react";

const AddingTest = () => {
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const parent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setList([input, ...list]);
    setInput("");
  };

  const handleDelete = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul ref={parent}>
        {list.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => handleDelete(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddingTest;
