import { PieChart } from '@mui/x-charts/PieChart';

const Chart = ({ series, w = 200, h = 200, colors }) => {
    return (
        <PieChart
            series={series}
            width={w}
            height={h}
            colors={colors}
        />
    )
};

export default Chart;