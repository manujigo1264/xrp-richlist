import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ address: string }> }
) {
    try {
        const { address } = await params;

        // Get account info
        const accountResponse = await fetch('https://s1.ripple.com:51234/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'account_info',
                params: [{
                    account: address,
                    ledger_index: 'validated'
                }]
            })
        });

        const accountData = await accountResponse.json();

        if (accountData.result?.error) {
            return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
        }

        const account = accountData.result.account_data;
        const balance = parseFloat(account.Balance) / 1000000;

        // Get transaction history
        const txResponse = await fetch('https://s1.ripple.com:51234/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'account_tx',
                params: [{
                    account: address,
                    ledger_index_min: -1,
                    ledger_index_max: -1,
                    limit: 20
                }]
            })
        });

        const txData = await txResponse.json();
        const transactions = txData.result?.transactions || [];

        // Process transactions
        const processedTxs = transactions.map((tx: any, idx: number) => {
            const meta = tx.meta;
            const transaction = tx.tx;

            let type = 'unknown';
            let amount = 0;
            let counterparty = '';

            if (transaction.TransactionType === 'Payment') {
                if (transaction.Destination === address) {
                    type = 'received';
                    counterparty = transaction.Account;
                } else {
                    type = 'sent';
                    counterparty = transaction.Destination;
                }

                if (typeof transaction.Amount === 'string') {
                    amount = parseFloat(transaction.Amount) / 1000000;
                }
            }

            return {
                id: idx + 1,
                type,
                amount,
                counterparty,
                timestamp: new Date((transaction.date + 946684800) * 1000).toISOString(),
                hash: transaction.hash
            };
        }).filter((tx: any) => tx.type !== 'unknown');

        return NextResponse.json({
            address,
            balance,
            transactions: processedTxs.slice(0, 10),
            totalTransactions: transactions.length,
            sequence: account.Sequence
        });

    } catch (error) {
        console.error('Error fetching wallet data:', error);
        return NextResponse.json({
            error: 'Failed to fetch wallet data'
        }, { status: 500 });
    }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';