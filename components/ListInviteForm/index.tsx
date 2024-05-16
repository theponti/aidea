import { ListInvite } from "@prisma/client";
import classNames from "classnames";
import AlertError from "components/AlertError";
import { SyntheticEvent, useCallback } from "react";
import useListInviteForm from "./useListInviteForm";

type ListInviteFormProps = {
  listId: string;
  onCreate: (invite: ListInvite) => void;
};
export default function ListInviteForm({
  listId,
  onCreate,
}: ListInviteFormProps) {
  const { error, isLoading, email, createListInvite, onEmailChange } =
    useListInviteForm({
      onCreate,
    });
  const onFormSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      createListInvite({ listId });
    },
    [createListInvite, listId],
  );

  return (
    <div className="mb-8">
      {error && <AlertError error={error} />}

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
              isLoading && "loading",
            )}
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
