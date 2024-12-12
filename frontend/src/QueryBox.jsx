import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import PromptRender from "./components/PromptRender";

function QueryBox() {
  const [query, setQuery] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    try {
      const res = await fetch("http://localhost:5000/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      console.log(data);
      setQuestions(data.questions);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAnswerChange = (index, e) => {
    setAnswers({ ...answers, [index]: e.target.value });
  };
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setDialogOpen(false);
    const res = await fetch(
      "http://localhost:5000/generate-prompt-with-context",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, answers, questions }),
      }
    );

    const data = await res.json();
    setPrompt(data.prompt);
    setOpenPromptDialog(true);
  };
  const handleClose = async () => {
    setDialogOpen(false);
    const res = await fetch(
      "http://localhost:5000/generate-prompt-without-context",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );
    const data = await res.json();
    setPrompt(data.prompt);
    setOpenPromptDialog(true);
  };
  const handlePromptClose = () => {
    setOpenPromptDialog(false);
    setButtonClicked(false);
  };

  return (
    <div className="flex justify-center mt-40 ">
      <div className="grid w-1/2 ">
        <Label htmlFor="message" className="m-3 ">
          Generate Prompt
        </Label>
        <Textarea
          placeholder="i want llm to be a math teacher"
          id="message"
          value={query}
          onChange={handleChange}
        />
        <div className="flex mt-2">
          {buttonClicked ? (
            <Button disabled className="w-1/5">
              <Loader2 className="animate-spin" />
              Generating
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-1/5 hover:bg-[#2c3e50]"
              onClick={handleSubmit}
            >
              Generate
            </Button>
          )}
          <Button className="ml-2 bg-[#9a7d0a] hover:bg-[#d4ac0d] text-white">
            <Link to="/store">Store</Link>
          </Button>
        </div>
        <Dialog open={dialogOpen} onOpenChange={handleClose}>
          <DialogTrigger asChild>
            <Button className="hidden">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>More Context for Prompt</DialogTitle>
              <DialogDescription>
                Please , Answer the following questions
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFinalSubmit}>
              {questions.map((question, index) => (
                <div key={index}>
                  <Label htmlFor={`answer-${index}`} className="m-3">
                    {question}
                  </Label>
                  <Textarea
                    id={`answer-${index}`}
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e)}
                  />
                </div>
              ))}
              <Button type="submit" className="mt-2 w-2/5">
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <PromptRender
          prompt={prompt}
          openPromptDialog={openPromptDialog}
          handleClose={handlePromptClose}
          query={query}
        />
      </div>
    </div>
  );
}

export default QueryBox;
