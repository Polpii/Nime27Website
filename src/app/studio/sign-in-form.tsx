"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "./actions";

const field =
  "mt-2 w-full border border-white/15 bg-white/[0.04] px-4 py-3 text-[16px] text-craie outline-none placeholder:text-brume/60 focus:border-neon-teal";
const label = "text-[11px] font-semibold uppercase tracking-[0.18em] text-brume";

export function SignInForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {});

  return (
    <form action={action} className="mt-10 max-w-sm">
      <div>
        <label className={label} htmlFor="name">
          Your name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className={field}
        />
        <p className="mt-2 text-[13px] text-brume">
          So we can see who changed what. It is not a login.
        </p>
      </div>

      <div className="mt-7">
        <label className={label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={field}
        />
      </div>

      {state.error && (
        <p className="mt-6 border-l-2 border-neon-rose pl-4 text-[15px] text-neon-rose">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-8 border border-neon-teal px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-neon-teal hover:bg-neon-teal hover:text-nuit disabled:opacity-50"
      >
        {pending ? "One moment" : "Open the studio"}
      </button>
    </form>
  );
}
