'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface WalletComparison {
    address: string;
    balance: number;
    rank: number;
    transactions: number;
}

export default function ComparePage() {
    const [wallet1, setWallet1] = useState('');
    const [wallet2, setWallet2] = useState('');
    const [wallet3, setWallet3] = useState('');
    const [comparison, setComparison] = useState<WalletComparison[]>([]);
    const [loading, setLoading] = useState(false);

    const handleCompare = async () => {
        setLoading(true);

        // Mock comparison data
        const mockData: WalletComparison[] = [
            wallet1 ? { address: wallet1, balance: 2000000, rank: 1, transactions: 15234 } : null,
            wallet2 ? { address: wallet2, balance: 1500000, rank: 2, transactions: 12543 } : null,
            wallet3 ? { address: wallet3, balance: 1000000, rank: 3, transactions: 9876 } : null,
        ].filter(Boolean) as WalletComparison[];

        setTimeout(() => {
            setComparison(mockData);
            setLoading(false);
        }, 500);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">Compare Wallets</h1>
                        <p className="text-gray-400">Compare up to 3 XRP wallets side by side</p>
                    </div>

                    {/* Input Section */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Wallet 1</label>
                                <input
                                    type="text"
                                    placeholder="rXXXXXXXXXXXXXXXXXXX..."
                                    value={wallet1}
                                    onChange={(e) => setWallet1(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Wallet 2</label>
                                <input
                                    type="text"
                                    placeholder="rXXXXXXXXXXXXXXXXXXX..."
                                    value={wallet2}
                                    onChange={(e) => setWallet2(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Wallet 3 (optional)</label>
                                <input
                                    type="text"
                                    placeholder="rXXXXXXXXXXXXXXXXXXX..."
                                    value={wallet3}
                                    onChange={(e) => setWallet3(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleCompare}
                            disabled={!wallet1 || !wallet2 || loading}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Comparing...' : 'Compare Wallets'}
                        </button>
                    </div>

                    {/* Comparison Results */}
                    {comparison.length > 0 && (
                        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Metric</th>
                                        {comparison.map((wallet, idx) => (
                                            <th key={idx} className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                                                Wallet {idx + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-400">Address</td>
                                        {comparison.map((wallet, idx) => (
                                            <td key={idx} className="px-6 py-4 text-sm font-mono text-blue-400">
                                                <a href={`/wallet/${wallet.address}`} className="hover:underline">
                                                    {wallet.address.substring(0, 15)}...
                                                </a>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-400">Balance</td>
                                        {comparison.map((wallet, idx) => (
                                            <td key={idx} className="px-6 py-4 text-sm font-semibold text-green-400">
                                                {wallet.balance.toLocaleString()} XRP
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-400">Rank</td>
                                        {comparison.map((wallet, idx) => (
                                            <td key={idx} className="px-6 py-4 text-sm">
                                                #{wallet.rank}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-400">Transactions</td>
                                        {comparison.map((wallet, idx) => (
                                            <td key={idx} className="px-6 py-4 text-sm">
                                                {wallet.transactions.toLocaleString()}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}