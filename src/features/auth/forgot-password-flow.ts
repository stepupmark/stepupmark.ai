import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { applyFieldErrors } from "~/lib/apply-field-errors";
import { describeError } from "~/lib/describe-error";

import {
  useForgotPasswordReset,
  useForgotPasswordStart,
  useForgotPasswordVerify,
} from "./mutations";
import {
  forgotPasswordEmailSchema,
  otpSchema,
  resetPasswordSchema,
  type ForgotPasswordEmailInput,
  type OtpInput,
  type ResetPasswordInput,
} from "./schemas";

export function useForgotPasswordFlow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  // Three separate payloads to three separate endpoints, not one growing form —
  // keeping a useForm per step also lets an earlier step's validation state reset
  // cleanly when the user goes back.
  const emailForm = useForm<ForgotPasswordEmailInput>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: { email: "" },
  });
  const otpForm = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });
  const resetForm = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const forgotPasswordStart = useForgotPasswordStart();
  const forgotPasswordVerify = useForgotPasswordVerify();
  const forgotPasswordReset = useForgotPasswordReset();

  async function submitEmail(values: ForgotPasswordEmailInput) {
    try {
      const { challengeId: id } = await forgotPasswordStart.mutateAsync(values);
      setChallengeId(id);
      setEmail(values.email);
      setStep(2);
    } catch (error) {
      if (applyFieldErrors(emailForm, error, ["email"] as const)) return;
      emailForm.setError("root", { message: describeError(error).description });
    }
  }

  async function submitOtp(values: OtpInput) {
    if (challengeId === null) return;
    try {
      const { resetToken: token } = await forgotPasswordVerify.mutateAsync({
        challengeId,
        code: values.code,
      });
      setResetToken(token);
      setStep(3);
    } catch (error) {
      if (applyFieldErrors(otpForm, error, ["code"] as const)) return;
      otpForm.setError("root", { message: describeError(error).description });
    }
  }

  async function submitReset(values: ResetPasswordInput) {
    if (resetToken === null) return;
    try {
      await forgotPasswordReset.mutateAsync({ resetToken, password: values.password });
      toast.success("Password reset — sign in with your new password");
    } catch (error) {
      if (applyFieldErrors(resetForm, error, ["password", "confirmPassword"] as const)) return;
      resetForm.setError("root", { message: describeError(error).description });
    }
  }

  function resendCode() {
    if (email === null) return;
    forgotPasswordStart.mutate(
      { email },
      {
        onSuccess: (data) => {
          setChallengeId(data.challengeId);
        },
      },
    );
  }

  function backToEmail() {
    setStep(1);
    setChallengeId(null);
    otpForm.reset();
  }

  return {
    step,
    emailForm,
    otpForm,
    resetForm,
    submitEmail,
    submitOtp,
    submitReset,
    resendCode,
    resendPending: forgotPasswordStart.isPending,
    backToEmail,
  };
}
