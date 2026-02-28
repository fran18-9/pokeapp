import React, { useState } from "react";

type FormProps = {
    onSubmit: (name: string) => void,
    loading: boolean
};

export default function Form({ onSubmit, loading }: FormProps) {
    const [name, setName] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!name.trim()) {
            alert("Please enter a name");
            return;
        }
        onSubmit(name);
    }
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4 justify-center">
            <input
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Enter Pokémon name..."
                className="px-4 py-2 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none bg-gray-50 text-gray-900 text-lg w-2/3 shadow"
                aria-label="Pokemon name"
                disabled={loading}
            />
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-bold shadow hover:bg-indigo-600 transition disabled:bg-gray-300 disabled:text-gray-500"
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </form>
    );
}