export default function Footer() {
    return (
        <footer className="bg-gray-800 border-t border-gray-700 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            XRP Rich List
                        </h3>
                        <p className="text-gray-400 text-sm">
                            The most comprehensive XRP wealth distribution tracker. Monitor whale movements,
                            analyze trends, and explore wallet details in real-time.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-300">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-gray-400 hover:text-white text-sm">About</a></li>
                            <li><a href="/analytics" className="text-gray-400 hover:text-white text-sm">Analytics</a></li>
                            <li><a href="/compare" className="text-gray-400 hover:text-white text-sm">Compare</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-300">Connect</h4>
                        <ul className="space-y-2">
                            <li><a href="https://github.com/manujigo1264/xrp-richlist" target="_blank" className="text-gray-400 hover:text-white text-sm">GitHub</a></li>
                            <li><a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white text-sm">Twitter</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm">Discord</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>© 2025 XRP Rich List. Data sourced from XRP Ledger. Not financial advice.</p>
                </div>
            </div>
        </footer>
    );
}