"use client";

import { api } from "@/lib/trpc/react";
import classNames from "classnames";
import AlertError from "components/AlertError";
import { SyntheticEvent, useCallback, useState } from "react";

type ListInviteFormProps = {
  listId: string;
};
export default function ListInviteForm({ listId }: ListInviteFormProps) {
  const { isError, mutateAsync, isPending } = api.lists.invite.useMutation();
  const [email, setEmail] = useState("");
  const onEmailChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  const onFormSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      await mutateAsync({ listId, email });
    },
    [email, listId, mutateAsync],
  );

  return (
    <div className="mb-8">
      {isError && <AlertError error="There was an issue sending the invite." />}

      <form onSubmit={onFormSubmit}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Invite someone new</span>
          </label>
          <input
            type="text"
            placeholder="What's their email?"
            className="input w-full text-lg p-2 border-stone-300 rounded placeholder:text-zinc-400"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        {!!email.length && (
          <button
            className={classNames(
              "btn btn-primary float-right min-w-full mb-4 rounded text-white",
              isPending && "loading",
            )}
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
