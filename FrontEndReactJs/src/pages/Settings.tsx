
import React from "react";
import SettingsForm from "@/components/settings/SettingsForm";
import { t } from "@/lib/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppContext } from "@/lib/AppContext";
import { Moon, Sun, Globe } from "lucide-react";

const Settings = () => {
  const { theme, toggleTheme, locale, setAppLocale } = useAppContext();
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight dark:text-white">{t("settings")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("theme")}</CardTitle>
            <CardDescription>Customize the appearance of the application</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={theme} 
              onValueChange={(value) => {
                if (value !== theme) toggleTheme();
              }}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  {t("lightTheme")}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  {t("darkTheme")}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("language")}</CardTitle>
            <CardDescription>Choose your preferred language</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={locale} 
              onValueChange={(value) => setAppLocale(value as 'en' | 'de')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="en" id="en" className="sr-only" />
                <Label
                  htmlFor="en"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                >
                  <Globe className="mb-3 h-6 w-6" />
                  {t("english")}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="de" id="de" className="sr-only" />
                <Label
                  htmlFor="de"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                >
                  <Globe className="mb-3 h-6 w-6" />
                  {t("german")}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      
      <SettingsForm />
    </div>
  );
};

export default Settings;
