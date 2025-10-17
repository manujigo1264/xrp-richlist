import { Client } from 'xrpl';

async function connectToXRPL() {
    const client = new Client('wss://xrplcluster.com/');

    try {
        await client.connect();
        console.log('Connected to XRP Ledger');

        // Get ledger info
        const ledger = await client.request({
            command: 'ledger',
            ledger_index: 'validated'
        });

        console.log('Current Ledger:', ledger.result.ledger_index);
        console.log('Close Time:', ledger.result.ledger.close_time_human);

        await client.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

connectToXRPL();