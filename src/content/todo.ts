/**
 * Placeholder convention (docs/04-content.md): any value the client still has to
 * supply starts with `TODO(client)`. Components render these as a visible dashed
 * placeholder in development and omit them in production. Before launch,
 * `grep -rn "TODO(client)" src --exclude=todo.ts --exclude=todo.tsx` must return nothing.
 */
export type Todo = `TODO(client)${string}`;

export function isTodo(value: unknown): value is Todo {
  return typeof value === "string" && value.startsWith("TODO(client)");
}

/** True for real, confirmed content (not empty, not a TODO placeholder). */
export function isFilled(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "" && !isTodo(value);
}
