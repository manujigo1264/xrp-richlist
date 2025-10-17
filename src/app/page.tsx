import RichList from '@/components/RichList';

export default function Home() {
    return (
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

                <RichList />
            </div>
        </main>
    );
}