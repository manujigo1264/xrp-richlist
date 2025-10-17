import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Client } from 'xrpl';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface AccountBalance {
    address: string;
    balance: number;
}

async function populateDatabase() {
    const client = new Client('wss://xrplcluster.com/');

    try {
        await client.connect();
        console.log('Connected to XRP Ledger');

        const accounts: AccountBalance[] = [];
        let marker: any = undefined;
        let pageCount = 0;

        console.log('Fetching account data...');

        // Fetch accounts (limited to 10 pages for testing)
        do {
            const response: any = await client.request({
                command: 'ledger_data',
                ledger_index: 'validated',
                limit: 1000,
                marker: marker,
                type: 'account'
            });

            pageCount++;
            console.log(`Fetched page ${pageCount}...`);

            if (response.result.state) {
                for (const entry of response.result.state) {
                    if (entry.LedgerEntryType === 'AccountRoot') {
                        const balance = parseFloat(entry.Balance) / 1000000;
                        accounts.push({
                            address: entry.Account,
                            balance: balance
                        });
                    }
                }
            }

            marker = response.result.marker;

            if (pageCount >= 10) break; // Limit for testing

        } while (marker);

        await client.disconnect();

        console.log(`\nTotal accounts fetched: ${accounts.length}`);
        console.log('Sorting by balance...');

        // Sort by balance
        accounts.sort((a, b) => b.balance - a.balance);

        console.log('Saving to Supabase...');

        // Save to database in batches
        const batchSize = 500;
        for (let i = 0; i < accounts.length; i += batchSize) {
            const batch = accounts.slice(i, i + batchSize).map((acc, idx) => ({
                address: acc.address,
                balance: acc.balance,
                rank: i + idx + 1
            }));

            const { error } = await supabase
                .from('wallets')
                .upsert(batch);

            if (error) {
                console.error('Error saving batch:', error);
            } else {
                console.log(`Saved batch ${Math.floor(i / batchSize) + 1}`);
            }
        }

        console.log('\n✓ Database populated successfully!');
        console.log(`Top 5 accounts:`);
        accounts.slice(0, 5).forEach((acc, idx) => {
            console.log(`${idx + 1}. ${acc.address}: ${acc.balance.toLocaleString()} XRP`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

populateDatabase();