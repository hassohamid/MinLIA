export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm ">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Utvecklad av studenter för studenter
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Ett verktyg skapat för att förenkla din LIA-process och hjälpa dig
            hålla koll på dina ansökningar
          </p>
        </div>
      </div>
    </footer>
  );
}
