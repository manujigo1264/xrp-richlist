import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold mb-8">About XRP Rich List</h1>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">What is XRP Rich List?</h2>
                            <p className="text-gray-300 leading-relaxed">
                                XRP Rich List is a comprehensive analytics platform for tracking XRP wealth distribution
                                across the ledger. We provide real-time insights into whale movements, wallet rankings,
                                and network statistics to help you understand the XRP ecosystem better.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Features</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Real-time wallet rankings and balances</li>
                                <li>Comprehensive wallet analytics and transaction history</li>
                                <li>Wealth distribution charts and statistics</li>
                                <li>Top movers tracking (24h changes)</li>
                                <li>Wallet comparison tools</li>
                                <li>Search and filter capabilities</li>
                                <li>CSV export functionality</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Data Source</h2>
                            <p className="text-gray-300 leading-relaxed">
                                All data is sourced directly from the XRP Ledger public blockchain. We connect to
                                validated ledger nodes to ensure accuracy and reliability. Data is updated regularly
                                to provide the most current information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                            <p className="text-gray-300 leading-relaxed">
                                This tool is for informational purposes only and does not constitute financial advice.
                                Always do your own research before making investment decisions. Wallet balances and
                                rankings are based on publicly available blockchain data and may not reflect the
                                complete holdings of any individual or entity.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                            <p className="text-gray-300 leading-relaxed">
                                For questions, feedback, or bug reports, please visit our{' '}
                                <a href="https://github.com/manujigo1264/xrp-richlist" className="text-blue-400 hover:underline">
                                    GitHub repository
                                </a>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}