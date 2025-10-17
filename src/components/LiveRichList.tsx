'use client';

import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { getWalletLabel } from '@/lib/knownWallets';

interface Account {
    rank: number;
    address: string;
    balance: number;
}

export default function LiveRichList() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchLiveData = async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/live-wallets?limit=50');
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setAccounts(data.wallets);
                setFilteredAccounts(data.wallets);
                setLastUpdate(new Date(data.lastUpdate).toLocaleTimeString());
            }
        } catch (err) {
            setError('Failed to fetch live data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setFilteredAccounts(accounts);
            return;
        }

        const lowercaseQuery = query.toLowerCase();
        const filtered = accounts.filter(account =>
            account.address.toLowerCase().includes(lowercaseQuery) ||
            account.rank.toString().includes(lowercaseQuery) ||
            getWalletLabel(account.address)?.label.toLowerCase().includes(lowercaseQuery)
        );

        setFilteredAccounts(filtered);
    };

    useEffect(() => {
        fetchLiveData();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Fetching live data from XRP Ledger...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
                <p className="text-red-400">{error}</p>
                <button
                    onClick={fetchLiveData}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div className="text-gray-400">
                    {searchQuery ? (
                        <>Showing {filteredAccounts.length} of {accounts.length} wallets</>
                    ) : (
                        <>Top {accounts.length} wallets - Last updated: {lastUpdate}</>
                    )}
                </div>
                <button
                    onClick={fetchLiveData}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            <div className="bg-green-900/20 border border-green-500 rounded-lg p-4 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">LIVE DATA from XRP Ledger</span>
            </div>

            <SearchBar onSearch={handleSearch} />

            {filteredAccounts.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-12 text-center border border-gray-700">
                    <p className="text-gray-400 text-lg">No wallets found matching "{searchQuery}"</p>
                    <button
                        onClick={() => handleSearch('')}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                    >
                        Clear Search
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-700">
                    <table className="min-w-full bg-gray-800">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Rank</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Address</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase">Balance (XRP)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredAccounts.map((account) => (
                                <tr key={account.rank} className="hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#{account.rank}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex flex-col gap-1">
                                            <a href={`/wallet/${account.address}`} className="text-blue-400 hover:text-blue-300 hover:underline font-mono">
                                                {account.address}
                                            </a>
                                            {(() => {
                                                const label = getWalletLabel(account.address);
                                                return label ? (
                                                    <span className={`text-xs px-2 py-1 rounded ${label.color} text-white w-fit`}>
                                                        {label.label}
                                                    </span>
                                                ) : null;
                                            })()}
                                        </div>
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
            )}
        </div>
    );
}