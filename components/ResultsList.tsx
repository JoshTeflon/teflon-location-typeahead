import type { LocationResult, Status } from "../hooks/useLocationSearch";
import { ResultItem } from "./ResultItem";

type ResultsListProps = {
  query: string;
  results: LocationResult[];
  status: Status;
  errorMessage: string;
  highlightedIndex: number;
  onSelect: (result: LocationResult) => void;
  onHover: (index: number) => void;
};

export function ResultsList({
  query,
  results,
  status,
  errorMessage,
  highlightedIndex,
  onSelect,
  onHover,
}: ResultsListProps) {
  if (!query.trim() || status === "idle") return null;

  return (
    <div className="z-3 mt-3 overflow-hidden rounded-[10px] border border-line bg-white shadow-results">
      {status === "loading" ? (
        <div className="p-5 text-center text-xs text-muted">
          <span className="mr-1.5 inline-block size-3 animate-[spin_.7s_linear_infinite] rounded-full border-2 border-lime-ring border-t-lime-dark align-[-2px]" />
          Finding locations
        </div>
      ) : null}

      {status === "error" ? <div className="p-5 text-center text-xs text-error">{errorMessage}</div> : null}

      {status === "success" && results.length === 0 ? (
        <div className="p-5 text-center text-xs text-muted">
          No results for <strong className="text-ink">{query}</strong>
        </div>
      ) : null}

      {status === "success" && results.length > 0 ? (
        <ul className="m-0 max-h-80 list-none overflow-y-auto p-2.5" aria-label="Location results" role="listbox">
          {results.map((result, index) => (
            <ResultItem
              highlighted={index === highlightedIndex}
              key={`${result.label}-${result.sublabel ?? index}`}
              onHover={() => onHover(index)}
              onSelect={() => onSelect(result)}
              result={result}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}