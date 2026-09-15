import Link from "next/link";
import CardVisual from "@/components/images/CardVisual";

type HeadingCard = {
  title: string;
  description: string;
  extra?: string;
  href?: string;
};

type HeadingCardGridProps = {
  items: HeadingCard[];
  columns?: 2 | 3 | 4;
};

/**
 * H3 cards with heading-matched photographs instead of emoji/icon placeholders.
 */
export default function HeadingCardGrid({ items, columns = 3 }: HeadingCardGridProps) {
  const colClass =
    columns === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3";

  return (
    <div className={`grid ${colClass} gap-6`}>
      {items.map((item) => {
        const body = (
          <>
            <CardVisual heading={item.title} />
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                {item.title}
              </h3>
              {item.extra ? (
                <p className="mb-2 text-sm font-medium text-blue-700">{item.extra}</p>
              ) : null}
              <p className="mb-3 text-sm text-slate-600">{item.description}</p>
              {item.href ? (
                <span className="text-sm font-semibold text-blue-600">Learn More →</span>
              ) : null}
            </div>
          </>
        );

        const className =
          "group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg";

        if (item.href) {
          return (
            <Link key={item.title} href={item.href} className={className}>
              {body}
            </Link>
          );
        }

        return (
          <article key={item.title} className={className}>
            {body}
          </article>
        );
      })}
    </div>
  );
}
