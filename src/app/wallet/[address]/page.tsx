import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface WalletPageProps {
    params: Promise<{
        address: string;
    }>;
}

async function getWalletDetails(address: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/wallet/${address}`, {
            cache: 'no-store'
        });

        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export default async function WalletPage({ params }: WalletPageProps) {
    const { address } = await params;
    const wallet = await getWalletDetails(address);

    if (!wallet) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <a href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
                            ← Back to Rich List
                        </a>
                        <h1 className="text-4xl font-bold mb-2">Wallet Details</h1>
                        <p className="text-gray-400 font-mono text-sm break-all">{wallet.address}</p>
                    </div>

                    {/* Live Data Badge */}
                    <div className="bg-green-900/20 border border-green-500 rounded-lg p-4 mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">LIVE DATA from XRP Ledger</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="text-gray-400 text-sm mb-2">Balance</div>
                            <div className="text-3xl font-bold text-green-400">
                                {wallet.balance.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 6
                                })} XRP
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="text-gray-400 text-sm mb-2">Account Sequence</div>
                            <div className="text-3xl font-bold text-purple-400">
                                {wallet.sequence.toLocaleString()}
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="text-gray-400 text-sm mb-2">Recent Transactions</div>
                            <div className="text-3xl font-bold text-blue-400">
                                {wallet.transactions.length}
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
                        {wallet.transactions.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">No recent transactions</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Type</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Amount</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Counterparty</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {wallet.transactions.map((tx: any) => (
                                            <tr key={tx.id} className="hover:bg-gray-750">
                                                <td className="px-4 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${tx.type === 'received' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                                                        }`}>
                                                        {tx.type}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 font-semibold">
                                                    {tx.amount.toLocaleString()} XRP
                                                </td>
                                                <td className="px-4 py-4 font-mono text-sm text-blue-400">
                                                    <a href={`/wallet/${tx.counterparty}`} className="hover:underline">
                                                        {tx.counterparty.substring(0, 15)}...
                                                    </a>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-400">
                                                    {formatDate(tx.timestamp)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}