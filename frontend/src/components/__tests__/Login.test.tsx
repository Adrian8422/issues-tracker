import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Login } from '../Login'
import { AuthProvider } from '../../contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

// Mock del servicio API
vi.mock('../../services/api', () => ({
  default: {
    post: vi.fn()
  }
}))

// Mock del contexto de autenticación
vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    login: vi.fn().mockRejectedValue(new Error('Login failed')),
    user: null,
    loading: false,
    logout: vi.fn()
  })
}))

const LoginWrapper = () => (
  <BrowserRouter>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </BrowserRouter>
)

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form', () => {
    render(<LoginWrapper />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginWrapper />)
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email es requerido')).toBeInTheDocument()
      expect(screen.getByText('Password es requerido')).toBeInTheDocument()
    })
  })

  it('allows user to type in form fields', () => {
    render(<LoginWrapper />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput).toHaveValue('test@test.com')
    expect(passwordInput).toHaveValue('password123')
  })
})
