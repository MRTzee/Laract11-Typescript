import { Link, router } from "@inertiajs/react";
import React, { FormEventHandler, useState } from "react";
import { PageProps } from "../types/index";

interface NavbarProps {
    auth: PageProps;
    fsearch: string;
}

const Navbar: React.FC<NavbarProps> = ({ auth, fsearch }) => {
    const [search, setSearch] = useState<string>(fsearch || "");
    const { user } = auth;

    const doSearchData: FormEventHandler = (e) => {
        e.preventDefault();
        router.get("/", { search }, { preserveState: true });
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href={route("index")} className="btn btn-ghost text-xl">
                    daisyUI
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <form onSubmit={doSearchData}>
                        <input
                            type="text"
                            value={search}
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" hidden>
                            Cari
                        </button>
                    </form>
                </div>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        {!user ? (
                            <>
                                <li>
                                    <Link href={route("login")} as="button">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route("register")} as="button">
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        as="button"
                                        className="justify-between"
                                    >
                                        Dashboard
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" as="button">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
