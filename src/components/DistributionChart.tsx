'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartData {
    range: string;
    count: number;
    percentage: number;
}

export default function DistributionChart() {
    const data: ChartData[] = [
        { range: '1B+', count: 5, percentage: 2.5 },
        { range: '500M-1B', count: 22, percentage: 8.3 },
        { range: '100M-500M', count: 51, percentage: 12.1 },
        { range: '20M-100M', count: 162, percentage: 15.8 },
        { range: '10M-20M', count: 290, percentage: 18.2 },
        { range: '5M-10M', count: 249, percentage: 11.5 },
        { range: '1M-5M', count: 1948, percentage: 22.6 },
        { range: '<1M', count: 3047, percentage: 9.0 },
    ];

    const colors = ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#3b0764', '#2e1065', '#1e1b4b'];

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-6">Wealth Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="range" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px'
                        }}
                        labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}