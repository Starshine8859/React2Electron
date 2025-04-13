
import React, { memo } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/AppContext";
import { t } from "@/lib/i18n";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={t('theme')}
      aria-label={t('theme')}
    >
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ThemeToggle);
