import { TradingViewWidget } from '@/feature/TradingViewWidget';

export default function Home() {
	return (
		<div className="flex min-h-screen home-wrapper">
			<div className="grid w--full gap-8 home-section">
				<div className="md:col-span-1 xl:col-span-1">
					<TradingViewWidget
						title="Market Overview"
						widgetType="market_overview"
						height={500}
						className="custom-chart"
					/>
				</div>
				<div className="md:col-span-1 xl:col-span-2">
					<TradingViewWidget
						title="Stock Heatmap"
						widgetType="heatmap"
						height={500}
						className="custom-chart"
					/>
				</div>
			</div>
			<div className="grid w--full gap-8 home-section">
				<div className="md:col-span-1 xl:col-span-1">
					<TradingViewWidget title="Market News" widgetType="top_stories" height={500} />
				</div>
				<div className="md:col-span-1 xl:col-span-2">
					<TradingViewWidget title="Market Quote" widgetType="market_quote" height={500} />
				</div>
			</div>
		</div>
	);
}
