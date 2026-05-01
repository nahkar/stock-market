'use client';
import { useEffect, useRef } from 'react';

type Props = {
	scriptUrl: string;
	config: Record<string, unknown>;
	height?: number;
}
export const useTradingViewWidget = ({ scriptUrl, config, height = 600 }: Props) => {
	const container = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = container.current;
		if (!el) return;
		if (el.dataset.loaded) return;
	
		el.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;
	
		const script = document.createElement('script');
		script.src = scriptUrl;
		script.async = true;
		script.innerHTML = JSON.stringify(config);
	
		el.appendChild(script);
		el.dataset.loaded = 'true';
	
		return () => {
			el.innerHTML = '';
			delete el.dataset.loaded;
		};
	}, [scriptUrl, config, height]);

	return container;
};
