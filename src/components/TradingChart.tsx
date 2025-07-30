'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, Time } from 'lightweight-charts';

type TradingChartProps = {
    data: {
        time: number;
        price: number;
        high: number;
        low: number;
        close: number;
        open: number
    }[]
}

const TradingChart = ({ data }: TradingChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    useEffect(() => {
        if (!chartRef.current && chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 400,
                layout: {
                    background: {
                        type: ColorType.Solid,
                        color: '#18181b'
                    },
                    textColor: '#d4d4d8'
                },
                grid: {
                    vertLines: { color: '#272932' },
                    horzLines: { color: '#272932' },
                },
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                }
            })

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
            });

            chartRef.current = chart
            seriesRef.current = candlestickSeries
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                seriesRef.current = null;
            }
        }
    }, [])

    useEffect(() => {
        if (seriesRef.current && data.length > 0) {
            // 确保数据按时间升序排列，并去重相同时间戳的数据
            const sortedData = [...data]
                .sort((a, b) => a.time - b.time)
                .filter((item, index, array) => {
                    // 只保留第一个相同时间戳的数据
                    if (index === 0) return true;
                    return item.time !== array[index - 1].time;
                });
            
            // 转换为图表需要的格式
            const chartData = sortedData.map(({ time, open, high, low, close }) => ({
                time: time as Time,
                open,
                high,
                low,
                close
            }));
            
            seriesRef.current.setData(chartData)
        }
    }, [data])

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">UNI 代币转账图表</h3>
            <div ref={chartContainerRef} className="w-full h-96" />
        </div>
    )
}

export default TradingChart