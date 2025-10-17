'use client';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search by address or rank..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full md:w-96 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            />
        </div>
    );
}