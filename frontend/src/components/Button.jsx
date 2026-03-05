import { Icon, Button as MButton } from "@mui/material";

const Button = ({ 
  	color = "primary", 
  	icon, 
  	children, 
  	...props 
}) => {
  	return (
    	<MButton
      		variant="contained"
      		color={color}
      		sx={{ textTransform: 'none', fontWeight: 700, ...props.sx }}
      		{...props}
    	>
      		{icon && <Icon sx={{ mr: 1 }}>{icon}</Icon>}
      		{children}
    	</MButton>
  	);
};

export default Button;