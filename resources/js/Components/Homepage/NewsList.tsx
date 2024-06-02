import React from "react";
import { News } from "@/types/news";

interface NewsListProps {
    data: News[];
}

const NewsList: React.FC<NewsListProps> = ({ data }) => {
    // console.log(data);
    if (!data) {
        return (
            <div className="text-center p-5 mt-10">
                <p className="text-lg text-gray-500">No news available.</p>
            </div>
        );
    }
    return (
        <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4">
            {data.map((news, i) => (
                <div
                    className="card w-full lg:w-96 bg-base-100 shadow-xl"
                    key={i}
                >
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {news.title}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>{news.description}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-inline">
                                {news.category}
                            </div>
                            <div className="badge badge-outline">
                                {news.author}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsList;
