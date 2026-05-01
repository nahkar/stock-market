'use client';
import { memo, useMemo } from 'react';
import { useTradingViewWidget } from '../model/useTradingViewWidget';
import {
	MARKET_OVERVIEW_WIDGET_CONFIG,
	HEATMAP_WIDGET_CONFIG,
	TRADINGVIEW_MARKET_OVERVIEW_SCRIPT_URL,
	TRADINGVIEW_HEATMAP_SCRIPT_URL,
	TRADINGVIEW_TOP_STORIES_SCRIPT_URL,
	TOP_STORIES_WIDGET_CONFIG,
	MARKET_DATA_WIDGET_CONFIG,
	TRADINGVIEW_MARKET_QUOTE_SCRIPT_URL,
} from '../model/constants';

type Props = {
	widgetType:
		| 'market_overview'
		| 'heatmap'
		| 'top_stories'
		| 'market_quote'
	height?: number;
	className?: string;
	title?: string;
};
export const TradingViewWidget = ({ widgetType, height = 600, className, title }: Props) => {
	const widgetParams = useMemo(() => {
		switch (widgetType) {
			case 'market_overview':
				return {
					config: MARKET_OVERVIEW_WIDGET_CONFIG,
					scriptUrl: TRADINGVIEW_MARKET_OVERVIEW_SCRIPT_URL,
				};
			case 'heatmap':
				return {
					config: HEATMAP_WIDGET_CONFIG,
					scriptUrl: TRADINGVIEW_HEATMAP_SCRIPT_URL,
				};
			case 'top_stories':
				return {
					config: TOP_STORIES_WIDGET_CONFIG,
					scriptUrl: TRADINGVIEW_TOP_STORIES_SCRIPT_URL,
				};
			case 'market_quote':
				return {
					config: MARKET_DATA_WIDGET_CONFIG,
					scriptUrl: TRADINGVIEW_MARKET_QUOTE_SCRIPT_URL,
				};
		}
	}, [widgetType]);
	const containerRef = useTradingViewWidget({
		scriptUrl: widgetParams.scriptUrl,
		config: widgetParams.config as Record<string, unknown>,
		height,
	});
	return (
		<div className='w-full'>
			{title && <h3 className='text-2xl font-semibold text-gray-100 mb-5'>{title}</h3>}
			<div
				className={`tradingview-widget-container h-full w-full ${className}`}
				ref={containerRef}
			>
				<div className='tradingview-widget-container__widget h-full w-full'></div>
			</div>
		</div>
	);
};

export default memo(TradingViewWidget);
