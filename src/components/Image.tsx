import React, { useState } from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback: React.ReactNode;
};

const Image: React.FC<ImageProps> = ({ fallback, ...props }) => {
  const [showFallback, setShowFallback] = useState(false);

  return showFallback ? (
    <>{fallback}</>
  ) : (
    <img
      {...props}
      onError={(event) => {
        setShowFallback(true);
        if (props.onError) {
          props.onError(event);
        }
      }}
    />
  );
};

export default Image;
