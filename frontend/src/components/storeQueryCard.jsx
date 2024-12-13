import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import PromptRender from "./PromptRender";
import PropTypes from "prop-types";
import { useState } from "react";

function StoreQueryCard({ prompt, title, id }) {
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const handleCardClick = () => setOpenPromptDialog(true);
  const handleClose = () => setOpenPromptDialog(false);
  return (
    <div>
      <Card
        className="mt-5 ml-5  w-40 bg-[#9a7d0a] transform transition-transform hover:scale-105 cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader>
          <CardDescription className="text-white font-medium ">
            {title}
          </CardDescription>
        </CardHeader>
      </Card>
      <PromptRender
        openPromptDialog={openPromptDialog}
        prompt={prompt}
        handleClose={handleClose}
        title={title}
        id={id}
      />
    </div>
  );
}

StoreQueryCard.propTypes = {
  prompt: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
};

export default StoreQueryCard;
