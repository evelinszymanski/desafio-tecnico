export const chipTheme = {
  ativo: (theme) => ({
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
  ausente: (theme) => ({
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  }),
  inativo: (theme) => ({
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
  remoto: (theme) => ({
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
  hibrido: (theme) => ({
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  }),
  presencial: (theme) => ({
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.dark,
  }),
};