import { NextResponse } from 'next/server';

export async function GET() {
    // Mock stats - in real app, calculate from database
    const stats = {
        totalWallets: 6774506,
        totalXRP: 64076663730,
        top10Percentage: 35.8,
        top100Percentage: 52.3,
    };

    return NextResponse.json(stats);
}