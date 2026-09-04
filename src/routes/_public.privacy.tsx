import { InfoIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function meta() {
  return [
    { title: "Privacy Policy | StepUpMark.AI" },
    { name: "description", content: "How StepUpMark.AI collects, uses and stores personal data." },
  ];
}

export default function PrivacyRoute() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>

      <Alert>
        <InfoIcon />
        <AlertTitle>This policy has not been published yet</AlertTitle>
        <AlertDescription>
          The route exists so the footer link resolves, but the text below is a placeholder. Replace
          it with the reviewed policy before taking payments.
        </AlertDescription>
      </Alert>

      <p className="text-pretty text-muted-foreground">
        This page will set out what personal data StepUpMark.AI collects, why it is collected, how
        long it is kept, who it is shared with, and how to request access to or deletion of it.
      </p>
    </div>
  );
}
