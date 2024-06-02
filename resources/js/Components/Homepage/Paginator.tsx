import { Pagination } from "@/types/pagination";
import { Link } from "@inertiajs/react";
import React from "react";

interface PaginatorProps {
    meta: Pagination;
}

const Paginator: React.FC<PaginatorProps> = ({ meta }) => {
    const { current_page, links } = meta;
    // console.log(meta);

    const prev = links[0].url;
    const next = links[meta.links.length - 1].url;
    const current = current_page;

    return (
        <div className="join">
            {prev && (
                <Link href={prev ?? "#"} className="join-item btn">
                    «
                </Link>
            )}

            <button className="join-item btn">Page {current}</button>
            {next && (
                <Link href={next ?? "#"} className="join-item btn">
                    »
                </Link>
            )}
        </div>
    );
};

export default Paginator;
