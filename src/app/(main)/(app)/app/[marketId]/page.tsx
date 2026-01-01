import { MarketDetail } from "@/components/pages/(app)/market-detail";

interface MarketDetailPageProps {
  params: Promise<{
    marketId: string;
  }>;
}

export default async function MarketDetailPage({ params }: MarketDetailPageProps) {
  const { marketId } = await params;
  
  return <MarketDetail marketId={marketId} />;
}