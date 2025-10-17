export const knownWallets: Record<string, { label: string; type: string; color: string }> = {
	// Ripple
	'rN7n7otQDd6FczFgLdlqtyMVrn3HMbjhpZ': { label: 'Ripple Escrow', type: 'escrow', color: 'bg-purple-500' },
	'rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL': { label: 'Ripple Escrow', type: 'escrow', color: 'bg-purple-500' },

	// Exchanges
	'rLHzPsX6oXkzU9rFfyge2yT4xUoVDqJjHK': { label: 'Bitstamp', type: 'exchange', color: 'bg-blue-500' },
	'rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv': { label: 'Bitstamp', type: 'exchange', color: 'bg-blue-500' },
	'rPVMhWBsfF9iMXYj3aAzJVkPDTFNSyWdKy': { label: 'Bitstamp', type: 'exchange', color: 'bg-blue-500' },
	'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B': { label: 'Bitso', type: 'exchange', color: 'bg-blue-500' },
	'rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w': { label: 'Binance', type: 'exchange', color: 'bg-blue-500' },
	'rEy8TFcrAPvhpKrwyrscNYyqBGUkE9hKaJ': { label: 'Binance', type: 'exchange', color: 'bg-blue-500' },
	'rJHygWcTLVpSXkowott6kzgZU6viQSVYM1': { label: 'Coinbase', type: 'exchange', color: 'bg-blue-500' },
	'rw2ciyaNshpHe7bCHo4bRWq6pqqynnWKQg': { label: 'Kraken', type: 'exchange', color: 'bg-blue-500' },
	'rLW9gnQo7BQhU6igk5keqYnH3TVrCxGRzm': { label: 'Bitfinex', type: 'exchange', color: 'bg-blue-500' },
	'rwBYyfufTzk77zUSKEu4MvixfarC35av1J': { label: 'Huobi', type: 'exchange', color: 'bg-blue-500' },

	// Gateways
	'rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL': { label: 'Ripple Gateway', type: 'gateway', color: 'bg-green-500' },
};

export function getWalletLabel(address: string) {
	return knownWallets[address] || null;
}