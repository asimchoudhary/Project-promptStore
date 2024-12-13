import { Archive } from "lucide-react";
import StoreQueryCard from "./storeQueryCard";

function Store() {
  const prompts = JSON.parse(localStorage.getItem("prompts")) || [];

  return (
    <div className="mt-2">
      <div className="text-center mt-10 font-sans text-xl font-medium flex items-center justify-center">
        <Archive className="h-6 w-6 mr-2" />
        Collections
      </div>
      {prompts.length !== 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-5">
          {prompts.map((prompt) => (
            <StoreQueryCard
              key={prompt.id}
              prompt={prompt.prompt}
              title={prompt.title}
              id={prompt.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-5 text-lg font-medium">
          No collections found
        </div>
      )}
    </div>
  );
}
export default Store;
