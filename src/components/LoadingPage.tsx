import { CircularProgress } from '@mui/material'

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <CircularProgress size={64} className="text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Loading...</h1>
        <p className="text-muted-foreground">Please wait while we prepare your content.</p>
      </div>
    </div>
  )
}