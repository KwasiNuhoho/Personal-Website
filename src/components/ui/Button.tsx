import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium text-sm px-5 py-2.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<Variant, string> = {
  primary: 'bg-[var(--color-accent)] text-[#12130f] hover:brightness-110',
  secondary:
    'bg-transparent border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)]',
  ghost: 'bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    const classes = `${base} ${variants[variant]} ${className}`;

    if (props.as === 'a') {
      const { as: _as, ...anchorProps } = props;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    const { as: _as2, ...buttonProps } = props as ButtonAsButton;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
