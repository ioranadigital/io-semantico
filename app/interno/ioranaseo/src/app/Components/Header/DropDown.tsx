import { useState, FC, ReactNode } from "react";

interface DropDownProps {
  children: ReactNode;
}

const DropDown: FC<DropDownProps> = ({ children }) => {
  const [mobileToggle, setMobileToggle] = useState<boolean>(false);
  const handelMobileToggle = (): void => {
    setMobileToggle(!mobileToggle);
  };
  return (
    <>
      <span
        className={
          mobileToggle
            ? "cs-munu_dropdown_toggle active"
            : "cs-munu_dropdown_toggle"
        }
        onClick={handelMobileToggle}
      >
        <span></span>
      </span>
      {children}
    </>
  );
};

export default DropDown;
