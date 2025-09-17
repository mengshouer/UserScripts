import { useEffect } from 'preact/hooks';
import { ModalProps } from '../types';
import { useTheme } from '../hooks/useTheme';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  style = {}
}: ModalProps) {
  const { theme } = useTheme();

  // ESC 键关闭模态框
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 10001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalStyle = {
    background: theme.panelBackground,
    color: theme.textColor,
    borderRadius: '12px',
    padding: '24px',
    width: '480px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    overflowY: 'auto' as const,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ...style,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: title ? '20px' : '0',
  };

  const titleStyle = {
    margin: 0,
    color: theme.textColor,
    fontSize: '20px',
    fontWeight: '600',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme.secondaryTextColor,
    padding: 0,
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        className={className}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={headerStyle}>
          {title && <h2 style={titleStyle}>{title}</h2>}
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.borderColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}