import { TextField, MenuItem, Select as MSelect, InputLabel, FormControl, FormHelperText, InputAdornment, IconButton, Icon } from '@mui/material';
import { Controller } from 'react-hook-form';
import Date from './Date';
import { useState } from 'react';

const RHFInput = ({ control, name, label, rules, type = "text", options = [], ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    if (!control || !name) return null;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules || { required: `${label} é obrigatório` }}
            render={({ field, fieldState }) => {
                const error = !!fieldState.error;
                const helperText = fieldState.error?.message;

                if (type === "text") {
                    return (
                        <TextField
                            {...field}
                            label={label}
                            error={error}
                            helperText={helperText}
                            fullWidth
                        />
                    );
                };

                if (type === "date") {
                    return (
                        <Date
                            {...field}
                            label={label}
                            error={error}
                            helperText={helperText}
                        />
                    );
                };

                if (type === "select") {
                    return (
                        <FormControl fullWidth error={error}>
                            <InputLabel id={`${name}-label`}>{label}</InputLabel>
                            <MSelect
                                {...field}
                                labelId={`${name}-label`}
                                label={label}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </MSelect>
                            {helperText && <FormHelperText>{helperText}</FormHelperText>}
                        </FormControl>
                    );
                };

                if (type === "password") {
                    return (
                        <TextField 
                            {...field}
                            label={label}
                            error={error}
                            helperText={helperText}
                            type={showPassword ? 'text' : 'password'}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword 
                                                    ? <Icon color="primary">visibility_off</Icon> 
                                                    : <Icon color="primary">visibility</Icon>
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    );
                };

                return null;
            }}
        />
    );
};

export default RHFInput;