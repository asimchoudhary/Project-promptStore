import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function QueryBox() {
  const [query, setQuery] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    try {
      const res = await fetch("http://localhost:5000/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setButtonClicked(false);
    }
  };

  return (
    <div className="flex justify-center mt-40 ">
      <div className="grid w-1/2 ">
        <Label htmlFor="message" className="m-3 ">
          Generate Prompt
        </Label>
        <Textarea
          placeholder="Type your Query here ."
          id="message"
          value={query}
          onChange={handleChange}
        />
        {buttonClicked ? (
          <Button disabled className="mt-2 w-1/5">
            <Loader2 className="animate-spin" />
            Generating
          </Button>
        ) : (
          <Button type="submit" className="mt-2 w-1/5" onClick={handleSubmit}>
            Generate
          </Button>
        )}
      </div>
    </div>
  );
}

export default QueryBox;
