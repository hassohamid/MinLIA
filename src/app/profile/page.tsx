import { getUser } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Construction } from "lucide-react";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) return null;

  const getInitials = (email: string) => {
    return email.split("@")[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {getInitials(user.email || "")}
          </AvatarFallback>
        </Avatar>

        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {user.user_metadata?.full_name || "LIA-Student"}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground justify-center sm:justify-start">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Work in Progress Card */}
      <Card className="text-center">
        <CardContent className="py-12">
          <Construction className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Profilsidan är en pågående process
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Vi arbetar på att göra denna sida ännu bättre. Här kommer du snart
            kunna hantera dina inställningar, se statistik och mycket mer.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
