import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root') as HTMLElement)

function App() {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
      }}
      data-testid="popup-container"
    ></div>
  )
}

root.render(<App />)
