import { Link, useSearchParams } from "react-router";

import { LockIcon, ShieldCheckIcon, UserPlusIcon } from "lucide-react";

import { AuthCard, useRegisterFlow } from "~/features/auth";
import { LoadingState } from "~/components/common/loading-state";

import { RegisterStepOne } from "./register-step-one";
import { RegisterStepThree } from "./register-step-three";
import { RegisterStepTwo } from "./register-step-two";

export function meta() {
  return [{ title: "Create account | StepUpMark.AI" }];
}

export function clientLoader() {
  return null;
}

export function HydrateFallback() {
  return <LoadingState rows={3} label="Loading" />;
}

const STEP_TITLES = {
  1: "Create an account",
  2: "Set a password",
  3: "Verify your email",
} as const;

const STEP_DESCRIPTIONS = {
  1: "Start building on stepupmark",
  2: "Make it at least 8 characters",
  3: "Enter the code we sent you",
} as const;

const STEP_ICONS = {
  1: UserPlusIcon,
  2: LockIcon,
  3: ShieldCheckIcon,
} as const;

export default function RegisterRoute() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const signInHref =
    redirectTo === undefined ? "/sign-in" : `/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`;

  const {
    step,
    form,
    otpForm,
    goToPassword,
    submitCredentials,
    submitOtp,
    resendCode,
    resendPending,
    backTo,
  } = useRegisterFlow(redirectTo);

  return (
    <AuthCard
      icon={STEP_ICONS[step]}
      title={STEP_TITLES[step]}
      description={STEP_DESCRIPTIONS[step]}
      footer={
        step === 3 ? undefined : (
          <>
            Already have an account?
            <Link
              to={signInHref}
              className="ml-1 font-medium text-auth-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </>
        )
      }
    >
      {step === 1 ? (
        <RegisterStepOne form={form} onNext={goToPassword} />
      ) : step === 2 ? (
        <RegisterStepTwo
          form={form}
          onSubmit={submitCredentials}
          onBack={() => {
            backTo(1);
          }}
        />
      ) : (
        <RegisterStepThree
          form={otpForm}
          onSubmit={submitOtp}
          onResend={resendCode}
          resendPending={resendPending}
          onBack={() => {
            backTo(2);
          }}
        />
      )}
    </AuthCard>
  );
}
