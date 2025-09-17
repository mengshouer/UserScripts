import { ButtonProps } from '../types';
import { useTheme } from '../hooks/useTheme';

const buttonVariants = {
  primary: {
    background: '#1da1f2',
    color: 'white',
    border: 'none',
  },
  secondary: (theme: any) => ({
    background: theme.buttonBackground,
    color: theme.buttonText,
    border: `1px solid ${theme.buttonBorder}`,
  }),
  danger: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
  },
};

const buttonSizes = {
  small: {
    padding: '6px 12px',
    fontSize: '12px',
  },
  medium: {
    padding: '8px 16px',
    fontSize: '14px',
  },
  large: {
    padding: '12px 24px',
    fontSize: '16px',
  },
};

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  style = {},
}: ButtonProps) {
  const { theme } = useTheme();

  const variantStyles = variant === 'secondary'
    ? buttonVariants.secondary(theme)
    : buttonVariants[variant];

  const buttonStyle = {
    ...variantStyles,
    ...buttonSizes[size],
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontWeight: '500',
    outline: 'none',
    transition: 'all 0.2s ease',
    ...style,
  };

  return (
    <button
      className={className}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {children}
    </button>
  );
}