import React from "react";

const ImprintDivider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <span className="my-5 mt-8 px-3 py-2 bg-slate-900 rounded-lg text-slate-50">
      {children}
    </span>
  );
};

export default ImprintDivider;
