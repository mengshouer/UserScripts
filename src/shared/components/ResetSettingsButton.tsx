import { useEffect, useState } from "preact/hooks";
import { useI18n } from "../i18n";
import { Button } from "./Button";

// 待确认态超时自动撤回，避免按钮长期停在危险状态
const CONFIRM_TIMEOUT_MS = 4000;

interface ResetSettingsButtonProps {
  onReset: () => void;
}

/** 重置不可撤销，故拆成两步：首次点击进入待确认态，再次点击才执行 */
export function ResetSettingsButton({ onReset }: ResetSettingsButtonProps) {
  const { t } = useI18n();
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) {
      return undefined;
    }

    const timer = window.setTimeout(() => setConfirming(false), CONFIRM_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [confirming]);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setConfirming(false);
    onReset();
  };

  return (
    <Button variant={confirming ? "danger" : "secondary"} onClick={handleClick}>
      {confirming ? t("common.resetConfirm") : t("common.resetSettings")}
    </Button>
  );
}
