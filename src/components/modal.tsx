import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

const Modal = ({ onClose }) => {
    const [focused, setFocused] = useState({
        name: false,
        email: false,
        phone: false,
        message: false
    });

    const handleFocus = (field) => {
        setFocused({ ...focused, [field]: true });
    };

    const handleBlur = (field, value) => {
        if (!value) {
            setFocused({ ...focused, [field]: false });
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-black md:w-[40rem] p-8 rounded-lg shadow-lg border-2 border-1e293b">
            <div className="flex items-center">
                <h2 className="text-2xl font-bold mb-4">Send Email</h2>
                <div className="inline-flex ml-12">
                    <Button className="mb-6" variant={"outline"}>
                        <MailIcon className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:flex">ak5das@uwaterloo.ca</span>
                    </Button>
                </div>
                </div>

                <form action="send-contact.php" method="post" id="submit-contact-form">
                    <div className="flex flex-col">
                        <div className="flex mt-2 ">
                            <div className="p-2 w-full relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required=""
                                    className="w-full  bg-inputColour rounded border  focus:border-blue-500 focus: bg-inputColour focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-300 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                    onFocus={() => handleFocus("name")}
                                    onBlur={(e) => handleBlur("name", e.target.value)}
                                />
                                <label
                                    htmlFor="name"
                                    className={`absolute top-0 left-4 transition-all duration-300 ${focused.name ? "text-sm text-gray-400 left-2 -translate-y-full" : "text-lg  text-gray-400  translate-y-2/4"}`}
                                >
                                    Name
                                </label>
                            </div>

                            <div className="p-2 w-full relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required=""
                                    className="w-full bg-inputColour rounded border  focus:border-blue-500 focus:bg-inputColour focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-300 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                    onFocus={() => handleFocus("email")}
                                    onBlur={(e) => handleBlur("email", e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute top-0 left-4 transition-all duration-300 ${focused.email ? "text-sm text-gray-400 left-2 -translate-y-full" : "text-lg text-gray-400 translate-y-2/4"}`}
                                >
                                    Email
                                </label>
                            </div>
                        </div>

                        <div className="p-2 mt-6 w-full relative">
                            <textarea
                                id="message"
                                name="message"
                                required=""
                                className="w-full  bg-inputColour rounded border  focus:border-blue-500 focus: bg-inputColour focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-300 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                onFocus={() => handleFocus("message")}
                                onBlur={(e) => handleBlur("message", e.target.value)}
                            ></textarea>
                            <label
                                htmlFor="message"
                                className={`absolute top-0 left-4 transition-all duration-300 ${focused.message ? "text-sm text-gray-400 left-2 -translate-y-full" : "text-lg  text-gray-400  translate-y-2/4"}`}
                            >
                                Message
                            </label>
                        </div>
                    </div>
                    <div className="flex mt-4 justify-end">
                        <button
                            type="submit"
                            className="flex px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg mr-2"
                        >
                            Send Message ✉
                        </button>


                        <div className="flex">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg mr-2"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
