import React from "react";
import "./vote.css";
import { StaticImageData } from "next/image";

interface Item {
  id: number;
  name: string;
  image: string | StaticImageData;
}

interface VoteTrackerProps {
  title: string;
  items: Item[];
  RenderComponent: React.ComponentType<{ vote: Item }>;
}

const VoteTracker: React.FC<VoteTrackerProps> = ({ title, items, RenderComponent }) => {
  return (
    <div className="votetracker">
      <h4 className="titleTrackerVote">{title}</h4>
      <section className="bodyTracker">
        {items.map((item) => (
          <RenderComponent key={item.id} vote={item} />
        ))}
      </section>
    </div>
  );
};

export default VoteTracker;
