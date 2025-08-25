import { Heart, Linkedin, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/40 bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center space-y-6">
          {/* Main message */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>utvecklad med</span>
            <Heart className="w-4 h-4 text-rose-500 fill-current rotate-12" />
            <span>
              av <span className="border-b">studenter</span> för
              <span className="border-b"> studenter</span>
            </span>
          </div>

          {/* Creators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/hassohamid/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Linkedin className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                <span>Hasso</span>
              </a>
              <a
                href="https://www.linkedin.com/in/maxnordin/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Linkedin className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                <span>Max</span>
              </a>
            </div>
          </div>

          {/* Feedback call-to-action */}
          <div className="bg-muted/30 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">
                Har du feedback eller önskemål?
              </span>
            </div>
            <p className="text-xs text-muted-foreground/80">
              Vi älskar att höra från användare! Kontakta oss gärna på LinkedIn
              för förslag på nya features eller förbättringar.
            </p>
          </div>

          {/* Subtle tagline */}
          <p className="text-xs text-muted-foreground/60">
            Ett verktyg skapat för att förenkla din LIA-process
          </p>
        </div>
      </div>
    </footer>
  );
}
