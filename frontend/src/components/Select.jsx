import { MenuItem, Select as MSelect, InputLabel, FormControl } from '@mui/material';

const Select = ({ label, options = [], onChange, value, size = "small", ...props }) => { 
    return ( 
        <FormControl fullWidth size={size}>
            <InputLabel id={`${label}-inputLabel}`}>
                {label}
            </InputLabel>
            <MSelect 
                id={`${label}-field`}
                name={`${label}-field`}
                labelId={`${label}-inputLabel`}
                label={label} 
                value={value}
                defaultValue=""
                onChange={onChange}
                {...props}
            >
                {options.map(option => ( 
                    <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize'}}> 
                        {option}
                    </MenuItem> 
                ))} 
            </MSelect>
        </FormControl> 
    ) 
}; 
export default Select;