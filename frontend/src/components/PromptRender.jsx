import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

function PromptRender({
  openPromptDialog,
  prompt,
  handleClose,
  query,
  title,
  buttonType,
  id,
}) {
  function onSave() {
    // Save the prompt
    const prompts = JSON.parse(localStorage.getItem("prompts")) || [];
    const newPrompt = {
      id: Date.now().toString(),
      title: query,
      prompt: prompt,
    };
    prompts.push(newPrompt);
    localStorage.setItem("prompts", JSON.stringify(prompts));
    handleClose();
  }
  function onDelete() {
    // Delete the prompt
    const prompts = JSON.parse(localStorage.getItem("prompts")) || [];
    const newPrompts = prompts.filter((p) => p.id !== id);
    localStorage.setItem("prompts", JSON.stringify(newPrompts));
    handleClose();
    window.location.reload();
  }

  return (
    <Dialog open={openPromptDialog} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="hidden">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ? title : "The Prompt"}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="relative bg-gray-100 p-4 rounded">
          <ReactMarkdown>{prompt}</ReactMarkdown>
        </DialogDescription>
        {buttonType === "save" ? (
          <Button onClick={onSave}> Save </Button>
        ) : (
          <Button onClick={onDelete}> Delete </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

PromptRender.propTypes = {
  openPromptDialog: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  prompt: PropTypes.string,
  query: PropTypes.string,
  title: PropTypes.string,
  buttonType: PropTypes.string,
  id: PropTypes.string,
};

export default PromptRender;
