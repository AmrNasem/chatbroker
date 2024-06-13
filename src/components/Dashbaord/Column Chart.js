import {
	BarChart,
	Bar,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{ name: 'Jan', value: 246 },
	{ name: 'Feb', value: 230 },
	{ name: 'Mar', value: 300 },
	{ name: 'Mar', value: 200 },
	{ name: 'Mar', value: 200 },
	{ name: 'Jan', value: 246 },
	{ name: 'Feb', value: 230 },
	{ name: 'Mar', value: 200 },
	{ name: 'Mar', value: 200 },
	{ name: 'Mar', value: 200 },
];

function TotalExchangeChart({ color }) {
	return (
		<ResponsiveContainer width="50%" height={80}>
			<BarChart data={data}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={color} stopOpacity={1} />
						<stop offset="95%" stopColor={color} stopOpacity={.3} />
					</linearGradient>
				</defs>
				<Bar
					dataKey="value"
					fill="url(#colorUv)"
					shape={(props) => (
						<rect
							x={props.x}
							y={props.y}
							width={props.width}
							height={props.height}
							rx={3}
							ry={3}
							fill="url(#colorUv)"
						/>
					)}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}

export default TotalExchangeChart;