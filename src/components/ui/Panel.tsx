import classNames from "classnames";
import React, { ReactNode } from "react";

interface PanelProps {
  className: string;
  children: ReactNode;
  [key: string]: any;
}

const Panel: React.FC<PanelProps> = ({ children, className, ...rest }) => {
  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white w-full",
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
};

export default Panel;
