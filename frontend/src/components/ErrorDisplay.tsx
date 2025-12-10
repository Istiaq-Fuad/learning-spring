"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  title?: string;
}

export default function ErrorDisplay({
  error,
  onRetry,
  title = "Something went wrong",
}: ErrorDisplayProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <CardTitle className="text-red-900">{title}</CardTitle>
        <CardDescription className="text-red-700">{error}</CardDescription>
      </CardHeader>
      {onRetry && (
        <CardContent className="text-center">
          <Button onClick={onRetry} variant="outline" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
