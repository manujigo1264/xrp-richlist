import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('Supabase URL:', supabaseUrl);
console.log('Key length:', supabaseKey?.length);

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log('Testing connection...');

    const { data, error } = await supabase
        .from('wallets')
        .insert([
            { address: 'rTESTADDRESS123456789', balance: 1000, rank: 1 }
        ]);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Success! Data inserted:', data);
    }
}

test();