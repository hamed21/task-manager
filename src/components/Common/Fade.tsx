import React from 'react';

type FadeType = {
  duration?: number;
  delay?: number;
  children: React.ReactNode;
  styles?: React.CSSProperties;
};

const Fade: React.FC<FadeType> = ({
  duration = 600,
  delay = 0,
  children,
  styles
}) => (
  <div
    className='animate-fade'
    style={{
      ...(styles || {}),
      animationDuration: `${duration}ms`,
      animationDelay: `${delay}ms`,
      animationFillMode: 'backwards'
    }}>
    {children}
  </div>
);

export default Fade;
