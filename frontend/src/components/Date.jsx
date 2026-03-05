import { DateField } from '@mui/x-date-pickers';

export default function Date({ value, onChange, ...props }) {
    return <DateField format="DD/MM/YYYY" value={value || null} onChange={onChange} {...props} />;
}