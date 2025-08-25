"use client";
import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import FormHeader from "./FormHeader";
import FormBody from "./FormBody";
export default function AddApplicationForm() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => setIsToggled((p) => !p);

  return (
    <Card className="border-dashed border-2 border-muted-foreground/30 transition-all duration-300 overflow-hidden shadow-none bg-gradient-to-br from-background to-muted/20 hover:border-muted-foreground/50">
      <CardHeader>
        <FormHeader isToggled={isToggled} onToggle={handleToggle} />
      </CardHeader>

      <FormBody isToggled={isToggled} />
    </Card>
  );
}
