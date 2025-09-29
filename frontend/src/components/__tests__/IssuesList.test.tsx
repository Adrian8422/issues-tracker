import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { IssuesList } from '../IssuesList'

// Mock del servicio
vi.mock('../../services/issueService', () => ({
  issueService: {
    getIssues: vi.fn()
  }
}))

const mockIssuesResponse = {
  issues: [
    {
      _id: '1',
      title: 'Test Issue 1',
      description: 'Test description',
      status: 'open' as const,
      priority: 'high' as const,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      createdBy: '1'
    },
    {
      _id: '2',
      title: 'Test Issue 2',
      description: 'Another description',
      status: 'closed' as const,
      priority: 'low' as const,
      createdAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
      createdBy: '1'
    }
  ],
  total: 2,
  page: 1,
  totalPages: 1
}

describe('IssuesList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders issues correctly', async () => {
    const { issueService } = await import('../../services/issueService')
    vi.mocked(issueService.getIssues).mockResolvedValue(mockIssuesResponse)

    render(<IssuesList />)

    await waitFor(() => {
      expect(screen.getByText('Test Issue 1')).toBeInTheDocument()
      expect(screen.getByText('Test Issue 2')).toBeInTheDocument()
    })
  })

  it('shows empty state when no issues', async () => {
    const { issueService } = await import('../../services/issueService')
    vi.mocked(issueService.getIssues).mockResolvedValue({
      issues: [],
      total: 0,
      page: 1,
      totalPages: 0
    })

    render(<IssuesList />)

    await waitFor(() => {
      expect(screen.getByText('No se encontraron issues')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', async () => {
    const { issueService } = await import('../../services/issueService')
    vi.mocked(issueService.getIssues).mockImplementation(() => new Promise(() => {}))

    render(<IssuesList />)

    expect(screen.getByText('Cargando issues...')).toBeInTheDocument()
  })
})
