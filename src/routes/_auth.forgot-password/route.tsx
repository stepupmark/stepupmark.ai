import { Link } from "react-router";

import { KeyRoundIcon, LockIcon, ShieldCheckIcon } from "lucide-react";

import { AuthCard, useForgotPasswordFlow } from "~/features/auth";
import { LoadingState } from "~/components/common/loading-state";

import { ForgotPasswordStepEmail } from "./forgot-password-step-email";
import { ForgotPasswordStepOtp } from "./forgot-password-step-otp";
import { ForgotPasswordStepReset } from "./forgot-password-step-reset";

export function meta() {
  return [{ title: "Reset your password | StepUpMark.AI" }];
}

export function clientLoader() {
  return null;
}

export function HydrateFallback() {
  return <LoadingState rows={3} label="Loading" />;
}

const STEP_TITLES = {
  1: "Reset your password",
  2: "Check your email",
  3: "Choose a new password",
} as const;

const STEP_ICONS = {
  1: KeyRoundIcon,
  2: ShieldCheckIcon,
  3: LockIcon,
} as const;

function stepDescription(step: 1 | 2 | 3) {
  if (step === 1) return "Enter the email on your account";
  if (step === 3) return "Make it at least 8 characters";
  return "Enter the code we sent you";
}

export default function ForgotPasswordRoute() {
  const {
    step,
    emailForm,
    otpForm,
    resetForm,
    submitEmail,
    submitOtp,
    submitReset,
    resendCode,
    resendPending,
    backToEmail,
  } = useForgotPasswordFlow();

  return (
    <AuthCard
      icon={STEP_ICONS[step]}
      title={STEP_TITLES[step]}
      description={stepDescription(step)}
      footer={
        step === 1 ? (
          <>
            Remember your password?
            <Link
              to="/sign-in"
              className="ml-1 font-medium text-auth-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </>
        ) : undefined
      }
    >
      {step === 1 ? (
        <ForgotPasswordStepEmail form={emailForm} onSubmit={submitEmail} />
      ) : step === 2 ? (
        <ForgotPasswordStepOtp
          form={otpForm}
          onSubmit={submitOtp}
          onResend={resendCode}
          resendPending={resendPending}
          onBack={backToEmail}
        />
      ) : (
        <ForgotPasswordStepReset form={resetForm} onSubmit={submitReset} />
      )}
    </AuthCard>
  );
}
