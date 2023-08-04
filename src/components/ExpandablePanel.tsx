import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import { useState } from "react";

interface ExpandablePanelProps {
  header: JSX.Element;
  children: JSX.Element | string;
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({
  header,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  const expandPanelHandler = () => {
    setExpanded((prevState) => !prevState);
  };
  return (
    <div className="mb-2 border rounded">
      <div className="flex items-center justify-between p-2">
        {header}
        <div className="cursor-pointer" onClick={expandPanelHandler}>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="border-t p-2">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
