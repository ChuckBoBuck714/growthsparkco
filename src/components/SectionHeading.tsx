type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-12 ${alignClass} ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-charcoal leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
