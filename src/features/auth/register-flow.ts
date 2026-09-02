import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { applyFieldErrors } from "~/lib/apply-field-errors";
import { describeError } from "~/lib/describe-error";

import { useRegisterStart, useRegisterVerify } from "./mutations";
import { otpSchema, registerSchema, type OtpInput, type RegisterInput } from "./schemas";

const STEP_ONE_FIELDS = ["name", "email"] as const;
const STEP_TWO_FIELDS = ["name", "email", "password", "confirmPassword"] as const;

export function useRegisterFlow(redirectTo?: string) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [pendingRegistration, setPendingRegistration] = useState<Omit<
    RegisterInput,
    "confirmPassword"
  > | null>(null);

  // One form spans steps 1 and 2 — they're subsets of the same eventual payload,
  // gated by trigger()-ing only the fields each step owns. Step 3 verifies an OTP
  // against an unrelated endpoint, so it gets its own form.
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", acceptTerms: false },
  });
  const otpForm = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const registerStart = useRegisterStart();
  const registerVerify = useRegisterVerify(redirectTo);

  async function goToPassword() {
    const valid = await form.trigger(STEP_ONE_FIELDS);
    if (valid) setStep(2);
  }

  async function submitCredentials(values: RegisterInput) {
    const { confirmPassword, ...payload } = values;
    try {
      const { challengeId: newChallengeId } = await registerStart.mutateAsync(payload);
      setChallengeId(newChallengeId);
      setPendingRegistration(payload);
      setStep(3);
    } catch (error) {
      if (applyFieldErrors(form, error, STEP_TWO_FIELDS)) {
        // A duplicate-email rejection targets a field that only step 1 renders —
        // send the user back so the error is actually visible.
        if (form.formState.errors.name !== undefined || form.formState.errors.email !== undefined) {
          setStep(1);
        }
        return;
      }
      form.setError("root", { message: describeError(error).description });
    }
  }

  async function submitOtp(values: OtpInput) {
    if (challengeId === null) return;
    try {
      await registerVerify.mutateAsync({ challengeId, code: values.code });
      toast.success("Account created");
    } catch (error) {
      if (applyFieldErrors(otpForm, error, ["code"] as const)) return;
      otpForm.setError("root", { message: describeError(error).description });
    }
  }

  function resendCode() {
    if (pendingRegistration === null) return;
    registerStart.mutate(pendingRegistration, {
      onSuccess: (data) => {
        setChallengeId(data.challengeId);
      },
    });
  }

  function backTo(target: 1 | 2) {
    setStep(target);
  }

  return {
    step,
    form,
    otpForm,
    goToPassword,
    submitCredentials,
    submitOtp,
    resendCode,
    resendPending: registerStart.isPending,
    backTo,
  };
}
