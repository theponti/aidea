import { ListInvite } from "@prisma/client";
import classNames from "classnames";
import { SyntheticEvent, useCallback } from "react";
import AlertError from "src/components/AlertError";
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
    [createListInvite, listId]
  );

  return (
    <>
      {error && <AlertError error={error} />}

      <form onSubmit={onFormSubmit}>
        <div className="form-control w-full mb-2">
          <label className="label hidden">
            <span className="label-text">Name of list</span>
          </label>
          <input
            type="text"
            placeholder="Enter email to invite."
            className="input w-full text-lg p-2 border-stone-300 rounded placeholder:text-zinc-400"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        {!!email.length && (
          <button
            className={classNames(
              "btn btn-primary float-right min-w-full mb-4 rounded text-white",
              isLoading && "loading"
            )}
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}
