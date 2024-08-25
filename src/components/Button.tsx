import React, {ReactElement} from 'react';

interface ButtonType {
  children: ReactElement | string;
  icon?: ReactElement | string;
  btnType: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonType> = props => {
  const {btnType, children, onClick, disabled, icon, loading} = props;
  return (
    <button onClick={onClick} disabled={disabled || loading}>
      {children}
    </button>
  );
};

export default Button;
