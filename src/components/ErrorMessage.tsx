interface ErrorMessageProps {
  message?: string
}

export default function ErrorMessage({ message = 'Error loading content' }: ErrorMessageProps) {
  return (
    <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
      {message}
    </div>
  )
}