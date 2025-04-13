
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const SettingsForm = () => {
  const { toast } = useToast();
  
  const handleSaveClick = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved."
    });
  };
  
  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="sync">Sync Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure your store's general settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" placeholder="Your Store Name" defaultValue="ShopFlow Demo Store" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Store Email</Label>
                <Input id="store-email" placeholder="store@example.com" defaultValue="contact@shopflow.example" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Email Notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for new orders, low stock, and other important events.
              </p>
            </div>
            
            <Button onClick={handleSaveClick}>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>
              Connect your store to other services and marketplaces.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="api-key" 
                    placeholder="Enter API key" 
                    defaultValue="sk_prod_*****************" 
                    type="password"
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use this key to access your store data via the API.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Marketplace Connections</Label>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Shopify</p>
                      <p className="text-sm text-muted-foreground">Connect to sync products and orders</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Amazon</p>
                      <p className="text-sm text-muted-foreground">Connect to sync products and orders</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <p className="font-medium">eBay</p>
                      <p className="text-sm text-muted-foreground">Connect to sync products and orders</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
            
            <Button onClick={handleSaveClick}>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="sync">
        <Card>
          <CardHeader>
            <CardTitle>Sync Settings</CardTitle>
            <CardDescription>
              Configure how and when your data syncs across platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sync-interval">Sync Interval</Label>
                <Select defaultValue="15">
                  <SelectTrigger id="sync-interval">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Every 5 minutes</SelectItem>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                    <SelectItem value="60">Every hour</SelectItem>
                    <SelectItem value="360">Every 6 hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How often to sync data between connected marketplaces.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-update">Auto-Update Inventory</Label>
                  <Switch id="auto-update" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically update inventory levels across all connected marketplaces.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-fulfill">Auto-Fulfill Orders</Label>
                  <Switch id="auto-fulfill" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically mark orders as fulfilled when shipping information is updated.
                </p>
              </div>
            </div>
            
            <Button onClick={handleSaveClick}>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsForm;
