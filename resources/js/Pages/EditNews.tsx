import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { PageProps } from "@/types";
import { News } from "@/types/news";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

interface EditNewsProps extends PageProps {
    myNews: News;
}

const EditNews: React.FC<EditNewsProps> = ({ myNews }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: myNews.id,
        title: myNews.title,
        description: myNews.description,
        category: myNews.category,
    });
    // console.log(myNews);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("update.news"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="card w-full lg:w-96 bg-base-100 shadow-xl">
                <div className="card-body">
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
                                isFocused={true}
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
                            <InputLabel htmlFor="category" value="Category" />
                            <TextInput
                                id="category"
                                name="category"
                                value={data.category}
                                className="mt-1 block w-full"
                                autoComplete="category"
                                isFocused={true}
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
                            SAVE
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditNews;
