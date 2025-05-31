import React from "react";
import PackCard from "../cards/PackCard";
export default function CoursesList({ packs }) {
  return (
    <div className="packs-container">
      {packs.map((pack) => (
        <PackCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}
