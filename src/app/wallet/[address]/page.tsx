import { notFound } from 'next/navigation';

interface WalletPageProps {
    params: {
        address: string;
    };
}

async function getWalletDetails(address: string) {
    // Mock data - replace with real API call later
    return {
        address: address,
        balance: 2000000.003,
        rank: 1,
        firstSeen: '2023-01-15T10:30:00Z',
        lastActive: '2024-10-16T08:45:00Z',
        totalTransactions: 15234,
        inboundTotal: 2500000,
        outboundTotal: 500000,
        netFlow: 2000000
    };
}

async function getWalletTransactions(address: string) {
    // Mock transaction data
    return [
        { id: 1, type: 'received', amount: 50000, from: 'rN7n7otQDd6FczFgLdlqtyMVrn3HMbjhpZ', timestamp: '2024-10-16T08:45:00Z' },
        { id: 2, type: 'sent', amount: 25000, to: 'rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w', timestamp: '2024-10-15T14:20:00Z' },
        { id: 3, type: 'received', amount: 100000, from: 'rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv', timestamp: '2024-10-14T11:30:00Z' },
    ];
}

export default async function WalletPage({ params }: WalletPageProps) {
    const wallet = await getWalletDetails(params.address);
    const transactions = await getWalletTransactions(params.address);

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

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="text-gray-400 text-sm mb-2">Balance</div>
                        <div className="text-3xl font-bold text-green-400">
                            {wallet.balance.toLocaleString()} XRP
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="text-gray-400 text-sm mb-2">Rank</div>
                        <div className="text-3xl font-bold text-purple-400">#{wallet.rank}</div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="text-gray-400 text-sm mb-2">Total Transactions</div>
                        <div className="text-3xl font-bold text-blue-400">
                            {wallet.totalTransactions.toLocaleString()}
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="text-gray-400 text-sm mb-2">Net Flow</div>
                        <div className={`text-3xl font-bold ${wallet.netFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {wallet.netFlow >= 0 ? '+' : ''}{wallet.netFlow.toLocaleString()} XRP
                        </div>
                    </div>
                </div>

                {/* Activity Info */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Activity Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-gray-400 text-sm mb-1">First Seen</div>
                            <div className="text-lg">{formatDate(wallet.firstSeen)}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm mb-1">Last Active</div>
                            <div className="text-lg">{formatDate(wallet.lastActive)}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm mb-1">Total Received</div>
                            <div className="text-lg text-green-400">
                                {wallet.inboundTotal.toLocaleString()} XRP
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
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
                                {transactions.map((tx) => (
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
                                            {'from' in tx ? tx.from : tx.to}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-400">
                                            {formatDate(tx.timestamp)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}