import type { LocationResult } from "../hooks/useLocationSearch";
import Image from "next/image";

type ResultItemProps = {
  result: LocationResult;
  highlighted: boolean;
  onSelect: () => void;
  onHover: () => void;
};

export function ResultItem({ result, highlighted, onSelect, onHover }: ResultItemProps) {
  return (
    <li
      aria-selected={highlighted}
      className={`flex min-h-14 items-center gap-2.5 rounded-[7px] p-2.5 text-ink hover:bg-lime-ring ${highlighted ? "bg-lime-ring" : ""}`}
      id={`location-result-${result.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      onMouseEnter={onHover}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onSelect}
      role="option"
    >
      {result.flag ? (
        <Image
          alt=""
          className="size-7 shrink-0 rounded-full object-cover"
          height={28}
          src={result.flag}
          width={28}
        />
      ) : (
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-lime-marker text-lg text-lime-dark" aria-hidden="true">
          ⌖
        </span>
      )}

      <span className="grid min-w-0 gap-1">
        <strong className="overflow-hidden text-xs text-ellipsis whitespace-nowrap">
          {result.label}
        </strong>

        {result.sublabel ? <small className="text-[0.625rem] text-text-faint">{result.sublabel}</small> : null}
      </span>

    </li>
  );
}