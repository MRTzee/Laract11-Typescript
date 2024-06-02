import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";
import Navbar from "@/Components/Navbar";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { PageProps } from "../types/index";
import { News } from "../types/news";
import { Pagination } from "../types/pagination";

interface HomepageProps {
    title: string;
    auth: PageProps;
    filters: {
        meta: Pagination;
        data: News[];
        search: string;
    };
}
const Homepage: React.FC<HomepageProps> = ({ title, auth, filters }) => {
    // const { props } = usePage();
    // console.log(props);
    return (
        <div className="min-h-screen bg-slate-100">
            <Head title={title} />
            <Navbar auth={auth} fsearch={filters.search} />
            <NewsList data={filters.data} />
            <div className="flex justify-center items-center">
                <Paginator meta={filters?.meta} />
            </div>
        </div>
    );
};

export default Homepage;
