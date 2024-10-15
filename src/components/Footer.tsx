import { Typography } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-background border-t border-y-divider"
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <Typography
          variant="body2"
          align="center"
          className="text-muted-foreground text-white"
        >
          © {currentYear} Chat App. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
}
