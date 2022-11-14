import classNames from "classnames";
import { SyntheticEvent, useCallback } from "react";
import AlertError from "src/components/AlertError";
import useListForm from "./useListForm";

type ListFormProps = {
  onCreate: () => void;
};
export default function ListForm({ onCreate }: ListFormProps) {
  const { error, isLoading, name, createList, onNameChange } = useListForm({
    onCreate,
  });
  const onFormSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      createList();
    },
    [createList]
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
            value={name}
            onChange={onNameChange}
          />
        </div>
        {!!name.length && (
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
