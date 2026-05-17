import { useTranslations } from "next-intl";

export function SectionHeading({
  tKey,
  className,
}: {
  tKey: string;
  className?: string;
}) {
  const t = useTranslations();

  return (
    <h2
      className={`text-2xl font-bold tracking-tight sm:text-3xl ${className || ""}`}
    >
      <span className="text-emerald-500 mr-2 font-mono text-xl sm:text-2xl">
        #
      </span>
      {t(tKey)}
    </h2>
  );
}