import { Notification } from "@/types/notification";
import { useEffect, useState } from "react";

export default function Toast({ flash }: Notification) {
    const [visible, setVisible] = useState(!!flash.message);
    useEffect(() => {
        if (flash.message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2000); // Menghilangkan setelah 2 detik

            return () => clearTimeout(timer);
        }
    }, [flash.message]);

    if (!visible) return null;
    return (
        <div className="toast">
            <div className="alert alert-success">
                <span>{flash.message}</span>
            </div>
        </div>
        // <div role="alert" className="alert alert-success">
        //     <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         className="stroke-current shrink-0 h-6 w-6"
        //         fill="none"
        //         viewBox="0 0 24 24"
        //     >
        //         <path
        //             strokeLinecap="round"
        //             strokeLinejoin="round"
        //             strokeWidth="2"
        //             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        //         />
        //     </svg>
        //     <span>{flash.message}</span>
        // </div>
    );
}
