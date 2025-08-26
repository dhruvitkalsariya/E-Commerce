'use client'

import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Something went wrong!</h1>
      <p className="text-small-regular text-ui-fg-base">
        An error occurred while loading this page.
      </p>
      <div className="flex gap-4">
        <button
          className="flex gap-x-1 items-center group bg-ui-fg-interactive text-ui-fg-on-interactive px-4 py-2 rounded-md hover:bg-ui-fg-interactive-hover transition-colors"
          onClick={reset}
        >
          <Text>Try again</Text>
        </button>
        <a
          className="flex gap-x-1 items-center group text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors"
          href="/"
        >
          <Text>Go to frontpage</Text>
          <ArrowUpRightMini
            className="group-hover:rotate-45 ease-in-out duration-150"
            color="var(--fg-interactive)"
          />
        </a>
      </div>
    </div>
  )
} 