import React, {ReactElement} from 'react';
import classNames from 'classnames';

interface ButtonType {
  children: ReactElement | string;
  icon?: ReactElement | string;
  btnType?: 'primary' | 'success' | 'error' | 'warning';
  loading?: boolean;
  disabled?: boolean;
  classNames?: string;
  onClick?: () => void;
}

const colorClasses: Record<string, string> = {
  primary: 'bg-primary-normal hover:bg-primary-dark text-white',
  success: 'bg-success-normal hover:bg-success-dark text-white',
  error: 'bg-error-normal hover:bg-error-dark text-white',
  warning: 'bg-warning-normal hover:bg-warning-dark text-white'
};

const Button: React.FC<ButtonType> = props => {
  const {
    btnType = 'primary',
    children,
    onClick,
    disabled,
    icon,
    loading,
    classNames
  } = props;

  const classes = `${colorClasses[btnType]}  block rounded-lg h-8 px-4 transition-all duration-200 ${classNames}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}>
      {children}
    </button>
  );
};

export default Button;
