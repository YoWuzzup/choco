import { ReactNode } from "react";
import Link from "next/link";

type TBreadcrumb = {
  crumbs: {
    name: string;
    href: string;
    svg?: ReactNode;
  }[];
};

export const Breadcrumb: React.FC<TBreadcrumb> = ({ crumbs, ...props }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb" {...props}>
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {crumbs.map((c, i) => {
          const current = i === crumbs.length - 1;

          return !current ? (
            <li className="flex items-center" key={`${c.name}_${i}`}>
              <Link
                href={c.href}
                className={`flex items-center text-sm text-primary capitalize 
                duration-300 font-bold hover:text-colorful`}
                aria-current={undefined}
              >
                {c.svg}
                {c.name}
              </Link>
              <span className="mx-2 text-primary">{">"}</span>
            </li>
          ) : (
            <li className="flex items-center" key={`${c.name}_${i}`}>
              <div
                className={`flex items-center text-sm text-primary capitalize 
                duration-300 font-medium opacity-60`}
                aria-current="page"
              >
                {c.svg}
                {c.name}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
