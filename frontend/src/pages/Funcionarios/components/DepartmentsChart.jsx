import { Card, CardContent, CardHeader, Icon, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "../../../components/Chart";

const DepartmentsChart = ({ employees }) => {
    const [series, setSeries] = useState([]);
    const theme = useTheme();
    const total = employees.length;
    const departments = [
        { id: "rh", label: "RH" },
        { id: "ti", label: "TI" },
        { id: "financeiro", label: "Financeiro" },
        { id: "comercial", label: "Comercial" }
    ];

    useEffect(() => {
        if (total === 0) return;

        const data = departments.map(dep => {
            const count = employees.filter(emp => emp.department === dep.id).length;
            const percentage = ((count / total) * 100).toFixed(1);

            return {
                id: dep.id,
                value: count,
                label: `${dep.label} (${percentage}%)`,
            };
        });

        setSeries([{
            data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: theme.palette.grey[400] },
        }]);
    }, [employees, total]);

    return (
        <Card 
            sx={{ 
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 
                theme.palette.grey[200] 
            }}
        >
            <CardHeader
                avatar={<Icon>bar_chart</Icon>}
                title="Funcionários por Departamento"
                slotProps={{
                    title: {
                        fontWeight: 700,
                        fontSize: 16,
                        textTransform: 'capitalize'
                    }
                }}
                sx={{
                    backgroundColor: 'secondary.light',
                    color: "primary.main",
                }}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                { total > 0 ? ( <Chart series={series} /> ) : ( "Sem dados disponíveis" ) }
            </CardContent>
        </Card>
    );
};

export default DepartmentsChart;