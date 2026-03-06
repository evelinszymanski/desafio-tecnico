export function stringAvatar(name, color) {
  const names = name.split(' ');

  return {
    sx: {
      bgcolor: 'secondary.light',
      color: 'secondary.dark',
    },
    children: `${names[0][0]}${names[1] ? names[1][0] : ''}`,
  };
};