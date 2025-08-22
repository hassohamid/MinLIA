"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AddApplicationForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    applicationDate: "",
    role: "",
    status: "",
  });

  const [toggleForm, setToggleForm] = useState(false);

  const handleToggle = () => {
    setToggleForm((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Add logic to save to Supabase

    // Reset form
    setFormData({
      companyName: "",
      applicationDate: "",
      role: "",
      status: "",
    });
    setToggleForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="border-dashed border-2 transition-all overflow-hidden shadow-none">
      <CardHeader className="">
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center hover:bg-muted/50 h-12 transition-all"
          onClick={handleToggle}
        >
          <div className="flex items-center gap-2">
            <Plus size={18} />
            <span>Lägg till ny ansökan</span>
          </div>
          <div className="transition-transform duration-200">
            {toggleForm ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </Button>
      </CardHeader>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          toggleForm ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <CardContent className="pt-0 border-t">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Företagsnamn</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Ange företagsnamn"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationDate">Ansökningsdatum</Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) =>
                    handleInputChange("applicationDate", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Roll</Label>
              <Input
                id="role"
                type="text"
                placeholder="Ange roll/position"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sökande">Sökande</SelectItem>
                  <SelectItem value="antagen">Antagen</SelectItem>
                  <SelectItem value="besvarat">Besvarat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Lägg till ansökan
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
