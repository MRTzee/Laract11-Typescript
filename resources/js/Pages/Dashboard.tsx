import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { News } from "@/types/news";
import { Notification } from "@/types/notification";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

interface DashboardProps extends PageProps, Notification {
    myNews: News[];
}

export default function Dashboard({ auth, flash, myNews }: DashboardProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        category: "",
    });

    useEffect(() => {
        if (!myNews) {
            router.get("/news");
        }
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("news"), {
            onSuccess: () => reset(),
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My News
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Toast flash={flash} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.title}
                                    className="mt-1"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                                <TextInput
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    autoComplete="description"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-1"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="category"
                                    value="Category"
                                />
                                <TextInput
                                    id="category"
                                    name="category"
                                    value={data.category}
                                    className="mt-1 block w-full"
                                    autoComplete="category"
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.category}
                                    className="mt-1"
                                />
                            </div>
                            <PrimaryButton
                                className="m-1 mt-4"
                                disabled={processing}
                            >
                                SUBMIT
                            </PrimaryButton>
                        </form>
                    </div>
                    <div className="py-4 flex flex-wrap gap-4 w-full justify-center">
                        {myNews && myNews.length > 0 ? (
                            myNews.map((news, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="card w-full lg:w-96 bg-base-100 shadow-xl"
                                    >
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {news?.title}
                                                <div className="badge badge-secondary">
                                                    NEW
                                                </div>
                                            </h2>
                                            <p>{news?.description}</p>
                                            <div className="card-actions justify-end">
                                                <div className="badge badge-inline">
                                                    {news?.category}
                                                </div>
                                                <div className="badge badge-outline">
                                                    <Link
                                                        href={route(
                                                            "edit.news"
                                                        )}
                                                        as="button"
                                                        method="get"
                                                        data={{ id: news?.id }}
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                                <div className="badge badge-outline">
                                                    <Link
                                                        href={route(
                                                            "delete.news"
                                                        )}
                                                        as="button"
                                                        method="post"
                                                        data={{ id: news?.id }}
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>You dont have any news</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
