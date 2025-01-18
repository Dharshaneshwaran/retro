export const retroStyles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '2rem',
    fontFamily: 'Courier New, monospace',
    backgroundColor: '#FFFFFF',
    color: '#3e2723',
    padding: '2.5rem',
    border: '3px solid #7a5230',
    borderRadius: '15px',
    boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.2)',
    maxWidth: '1200px',
    margin: '2rem auto',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    textShadow: '3px 3px 4px #7a5230'
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2.5rem',
    fontStyle: 'italic',
    lineHeight: '1.6'
  },
  button: {
    backgroundColor: '#7a5230',
    color: 'white',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '4px 4px 8px #7a5230'
  },
  dropZone: {
    border: '3px dashed #7a5230',
    borderRadius: '12px',
    padding: '2rem',
    marginTop: '2rem',
    backgroundColor: '#f8f4f1',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  filePreview: {
    backgroundColor: '#fff',
    border: '2px solid #7a5230',
    borderRadius: '8px',
    padding: '1rem',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};