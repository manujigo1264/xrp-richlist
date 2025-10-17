'use client';

interface Mover {
    rank: number;
    address: string;
    balance: number;
    change24h: number;
    changePercent: number;
}

export default function TopMovers() {
    // Mock data - biggest gainers and losers
    const movers: Mover[] = [
        { rank: 15, address: 'rN7n7otQDd6FczFgLdlqtyMVrn3HMbjhpZ', balance: 50000000, change24h: 5000000, changePercent: 11.11 },
        { rank: 28, address: 'rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w', balance: 30000000, change24h: 2500000, changePercent: 9.09 },
        { rank: 42, address: 'rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv', balance: 20000000, change24h: -3000000, changePercent: -13.04 },
        { rank: 67, address: 'rU6K7V3Po4snVhBBaU29sesqs2qTQJWDw1', balance: 15000000, change24h: -2000000, changePercent: -11.76 },
    ];

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-6">Top Movers (24h)</h2>
            <div className="space-y-4">
                {movers.map((mover) => (
                    <div key={mover.address} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors">
                        <div className="flex items-center space-x-4 flex-1">
                            <div className="text-gray-400 text-sm">#{mover.rank}</div>
                            <div>
                                <a href={`/wallet/${mover.address}`} className="text-blue-400 hover:text-blue-300 font-mono text-sm">
                                    {mover.address.substring(0, 20)}...
                                </a>
                                <div className="text-gray-400 text-sm">
                                    {mover.balance.toLocaleString()} XRP
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`text-lg font-bold ${mover.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {mover.change24h >= 0 ? '+' : ''}{mover.change24h.toLocaleString()} XRP
                            </div>
                            <div className={`text-sm ${mover.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {mover.changePercent >= 0 ? '+' : ''}{mover.changePercent.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}