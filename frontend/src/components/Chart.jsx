import { PieChart } from '@mui/x-charts/PieChart';

const Chart = ({ series, w = 180, h = 180, colors }) => {
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