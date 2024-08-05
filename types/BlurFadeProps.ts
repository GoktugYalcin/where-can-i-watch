export type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  onClick?(): void;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
};
