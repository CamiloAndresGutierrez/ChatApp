import { SentimentDissatisfied } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <SentimentDissatisfied className="w-16 h-16 text-muted-foreground mx-auto" />
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="text-lg font-semibold text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
