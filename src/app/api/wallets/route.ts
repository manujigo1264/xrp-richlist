import { NextResponse } from 'next/server';

// Generate mock data for top 100 wallets
const generateMockWallets = () => {
    const wallets = [];
    const baseBalances = [2000000, 1685711, 667992, 199277, 109256];

    for (let i = 0; i < 100; i++) {
        const baseBalance = baseBalances[i % 5] || 50000;
        const randomFactor = Math.random() * 0.3 + 0.85;
        const balance = baseBalance * randomFactor * (100 - i) / 100;

        wallets.push({
            rank: i + 1,
            address: `r${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
            balance: parseFloat(balance.toFixed(6))
        });
    }

    return wallets;
};

const mockWallets = generateMockWallets();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let filtered = mockWallets;

    if (search) {
        filtered = mockWallets.filter(w =>
            w.address.toLowerCase().includes(search) ||
            w.rank.toString().includes(search)
        );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return NextResponse.json({
        wallets: paginated,
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit)
    });
}