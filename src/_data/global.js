export default {
  generated: new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
  }).format(new Date()),
}
