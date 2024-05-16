import classNames from "classnames";
import AlertError from "components/AlertError";
import { SyntheticEvent, useCallback } from "react";
import useListInviteForm from "./useListInviteForm";

type ListInviteFormProps = {
  listId: string;
  onCreate: () => void;
};
export default function ListInviteForm({
  listId,
  onCreate,
}: ListInviteFormProps) {
  const { error, isLoading, email, createListInvite, onNameChange } =
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
    <>
      {error && <AlertError error={error} />}

      <form onSubmit={onFormSubmit}>
        <div className="form-control w-full mb-2">
          <label className="label hidden">
            <span className="label-text">Name of list</span>
          </label>
          <input
            type="text"
            placeholder="What should we call this list?"
            className="input w-full text-lg p-2 border-stone-300 rounded placeholder:text-zinc-400"
            value={email}
            onChange={onNameChange}
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
    </>
  );
}
