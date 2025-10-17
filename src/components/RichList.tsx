'use client';

import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

interface Account {
    rank: number;
    address: string;
    balance: number;
}

interface ApiResponse {
    wallets: Account[];
    total: number;
    page: number;
    totalPages: number;
}

export default function RichList() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: '20'
        });

        fetch(`/api/wallets?${params}`)
            .then(res => res.json())
            .then((data: ApiResponse) => {
                setAccounts(data.wallets);
                setTotal(data.total);
                setTotalPages(data.totalPages);
                setLoading(false);
            });
    }, [search, page]);

    const handleSearch = (query: string) => {
        setSearch(query);
        setPage(1);
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div className="text-gray-400">
                    Showing {accounts.length} of {total} wallets
                </div>
            </div>

            <SearchBar onSearch={handleSearch} />

            <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="min-w-full bg-gray-800">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Rank
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Address
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Balance (XRP)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {accounts.map((account) => (
                            <tr key={account.rank} className="hover:bg-gray-750 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    #{account.rank}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                                    <a href={`/wallet/${account.address}`} className="text-blue-400 hover:text-blue-300 hover:underline">
                                        {account.address}
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold">
                                    {account.balance.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 6
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                >
                    Previous
                </button>

                <span className="text-gray-400">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}