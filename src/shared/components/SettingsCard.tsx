import { useTheme } from "../hooks/useTheme";
import { styled } from "../utils/goober-setup";

interface SettingsCardProps {
  title?: string;
  children: any;
  className?: string;
  style?: Record<string, string | number>;
}

const Card = styled("div")`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CardHeader = styled("div")`
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-header-bg);
  border-radius: 12px 12px 0 0;
`;

const CardTitle = styled("h3")`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardContent = styled("div")`
  padding: 20px;
`;

export function SettingsCard({ title, children, className = "", style = {} }: SettingsCardProps) {
  const { theme, isDark } = useTheme();

  const cardStyle = {
    "--card-bg": theme.panelBackground,
    "--card-border": theme.borderColor,
    "--card-header-bg": isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
    "--card-title-color": theme.textColor,
    ...style,
  };

  return (
    <Card className={className} style={cardStyle}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
