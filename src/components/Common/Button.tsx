import React, {ReactElement} from 'react';
import classNames from 'classnames';

interface ButtonType {
  children: ReactElement | string;
  icon?: ReactElement | string;
  btnType?: 'primary' | 'success' | 'error' | 'warning' | 'primaryText';
  loading?: boolean;
  disabled?: boolean;
  classNames?: string;
  onClick?: () => void;
}

const colorClasses: Record<string, string> = {
  primary: 'bg-primary-normal hover:bg-primary-dark text-white',
  success: 'bg-success-normal hover:bg-success-dark text-white',
  error: 'bg-error-normal hover:bg-error-dark text-white',
  warning: 'bg-warning-normal hover:bg-warning-dark text-white',
  primaryText:
    'bg-transparent text-primary-normal border-2 border-primary-normal hover:bg-background-subtle'
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

  const classes = `${colorClasses[btnType]} flex items-center block rounded-lg h-8 px-4 transition-all duration-200 ${classNames}`;

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
