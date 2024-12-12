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

function PromptRender({ openPromptDialog, prompt, handleClose }) {
  return (
    <Dialog open={openPromptDialog} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="hidden">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>The Prompt</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ReactMarkdown>{prompt}</ReactMarkdown>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

PromptRender.propTypes = {
  openPromptDialog: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  prompt: PropTypes.string,
};

export default PromptRender;
