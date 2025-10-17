import RichList from '@/components/RichList';
import Stats from '@/components/Stats';
import DistributionChart from '@/components/DistributionChart';
import TopMovers from '@/components/TopMovers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getStats() {
    const res = await fetch('http://localhost:3000/api/stats', {
        cache: 'no-store'
    });
    return res.json();
}

export default async function Home() {
    const stats = await getStats();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            XRP Rich List
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Real-time XRP wealth distribution and analytics
                        </p>
                    </div>

                    <Stats {...stats} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2">
                            <DistributionChart />
                        </div>
                        <div>
                            <TopMovers />
                        </div>
                    </div>

                    <RichList />
                </div>
            </main>
            <Footer />
        </>
    );
}