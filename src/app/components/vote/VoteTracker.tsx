import React from "react";
import "./vote.css";
import { VoteType } from '../../services/VoteType';

interface VoteTrackerProps {
  title: string;
  items: VoteType[];
  RenderComponent: React.FC<{ vote: VoteType }>;
}

const VoteTracker: React.FC<VoteTrackerProps> = ({ title, items, RenderComponent }) => {
  return (
    <div className="votetracker">
      <h4 className="titleTrackerVote">{title}</h4>
      <section className="bodyTracker">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id_vote}>
              <RenderComponent vote={item} />
            </div>
          ))
        ) : (<></>
        )}
      </section>
    </div>
  );
};

export default VoteTracker;
