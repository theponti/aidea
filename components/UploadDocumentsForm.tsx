"use client";

import { useState, type FormEvent } from "react";

import DEFAULT_RETRIEVAL_TEXT from "@/data/DefaultRetrievalText";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";

export function UploadDocumentsForm() {
  const [isPending, setIsPending] = useState(false);
  const [document, setDocument] = useState(DEFAULT_RETRIEVAL_TEXT);
  const ingest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await fetch("/api/retrieval/ingest", {
        method: "POST",
        body: JSON.stringify({
          text: document,
        }),
      });
      setDocument("Uploaded!");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setDocument("Failed to upload");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={ingest} className="flex w-full mb-4">
      <textarea
        className="grow mr-8 p-4 rounded"
        value={document}
        onChange={(e) => setDocument(e.target.value)}
      ></textarea>
      <Button
        type="submit"
        className="shrink-0 px-8 py-4 bg-black hover:bg-black text-white rounded-xl"
      >
        {isPending ? (
          <div role="status" className="flex justify-center">
            <Loader className="animate-spin-slow" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <span>Upload</span>
        )}
      </Button>
    </form>
  );
}
