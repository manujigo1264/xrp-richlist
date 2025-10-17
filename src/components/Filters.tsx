'use client';

interface FiltersProps {
    onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
    minBalance?: number;
    maxBalance?: number;
    sortBy: 'rank' | 'balance' | 'change';
}

export default function Filters({ onFilterChange }: FiltersProps) {
    const handleBalanceChange = (min: string, max: string) => {
        onFilterChange({
            minBalance: min ? parseFloat(min) : undefined,
            maxBalance: max ? parseFloat(max) : undefined,
            sortBy: 'rank'
        });
    };

    const quickFilters = [
        { label: 'All', min: 0, max: undefined },
        { label: '1M+', min: 1000000, max: undefined },
        { label: '10M+', min: 10000000, max: undefined },
        { label: '100M+', min: 100000000, max: undefined },
    ];

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                {quickFilters.map((filter) => (
                    <button
                        key={filter.label}
                        onClick={() => onFilterChange({ minBalance: filter.min, maxBalance: filter.max, sortBy: 'rank' })}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Custom Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Min Balance (XRP)</label>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => handleBalanceChange(e.target.value, '')}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Max Balance (XRP)</label>
                    <input
                        type="number"
                        placeholder="No limit"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => handleBalanceChange('', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}