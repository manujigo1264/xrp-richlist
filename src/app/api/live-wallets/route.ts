import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    try {
        const accounts: any[] = [];
        let marker: string | undefined = undefined;

        // Fetch data from public XRP Ledger API
        for (let i = 0; i < 3; i++) {
            const body: any = {
                method: 'ledger_data',
                params: [{
                    ledger_index: 'validated',
                    limit: 1000,
                    type: 'account'
                }]
            };

            if (marker) {
                body.params[0].marker = marker;
            }

            const response = await fetch('https://s1.ripple.com:51234/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (data.result?.state) {
                for (const entry of data.result.state) {
                    if (entry.LedgerEntryType === 'AccountRoot') {
                        accounts.push({
                            address: entry.Account,
                            balance: parseFloat(entry.Balance) / 1000000
                        });
                    }
                }
            }

            marker = data.result?.marker;
            if (!marker) break;
        }

        // Sort by balance
        accounts.sort((a, b) => b.balance - a.balance);

        // Add ranks
        const ranked = accounts.slice(0, limit).map((acc, idx) => ({
            rank: idx + 1,
            address: acc.address,
            balance: acc.balance
        }));

        return NextResponse.json({
            wallets: ranked,
            total: accounts.length,
            lastUpdate: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error fetching live data:', error);
        return NextResponse.json({
            error: 'Failed to fetch data from XRP Ledger',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';