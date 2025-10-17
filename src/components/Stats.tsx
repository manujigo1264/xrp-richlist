'use client';

interface StatsProps {
    totalWallets: number;
    totalXRP: number;
    top10Percentage: number;
    top100Percentage: number;
}

export default function Stats({ totalWallets, totalXRP, top10Percentage, top100Percentage }: StatsProps) {
    const stats = [
        { label: 'Total Wallets', value: totalWallets.toLocaleString() },
        { label: 'Total XRP Tracked', value: `${(totalXRP / 1_000_000).toFixed(2)}M` },
        { label: 'Top 10 Hold', value: `${top10Percentage.toFixed(2)}%` },
        { label: 'Top 100 Hold', value: `${top100Percentage.toFixed(2)}%` },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                </div>
            ))}
        </div>
    );
}