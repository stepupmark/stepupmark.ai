import { InfoIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function meta() {
  return [
    { title: "Refund Policy | StepUpMark.AI" },
    { name: "description", content: "When and how StepUpMark.AI issues refunds." },
  ];
}

export default function RefundPolicyRoute() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Refund Policy</h1>

      <Alert>
        <InfoIcon />
        <AlertTitle>This policy has not been published yet</AlertTitle>
        <AlertDescription>
          The route exists so the footer link resolves, but the text below is a placeholder. Replace
          it with the reviewed policy before taking payments.
        </AlertDescription>
      </Alert>

      <p className="text-pretty text-muted-foreground">
        This page will state the refund window, how consumed generation tokens affect eligibility,
        how to raise a request, and the expected turnaround for a decision and repayment.
      </p>
    </div>
  );
}
