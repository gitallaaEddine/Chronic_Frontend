import { memo } from "react";

function Container({ children, className = "" }) {
  return (
    <div className={`mx-6 sm:mx-10 lg:mx-25 xl:mx-30 ${className}`}>
      {children}
    </div>
  );
}

export default memo(Container);
