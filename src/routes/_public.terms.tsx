import { InfoIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function meta() {
  return [
    { title: "Terms of Use | StepUpMark.AI" },
    { name: "description", content: "The terms governing use of StepUpMark.AI." },
  ];
}

export default function TermsRoute() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
      <Alert>
        <InfoIcon />
        <AlertTitle>These terms have not been published yet</AlertTitle>
        <AlertDescription>
          The route exists so the footer link resolves, but the text below is a placeholder. Replace
          it with the reviewed terms before taking payments.
        </AlertDescription>
      </Alert>

      <p className="text-pretty text-muted-foreground">
        This page will cover account eligibility, acceptable use of the generation tools, ownership
        and licensing of generated assets, billing and renewal, suspension, and limitation of
        liability.
      </p>
    </div>
  );
}
