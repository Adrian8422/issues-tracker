import { useState, useEffect, useCallback } from 'react';
import { issueService } from '../services/issueService';
import type { Issue, IssueFilters } from '../types/issue';

interface IssuesListProps {
  refreshTrigger?: number;
  onIssueClick?: (issue: Issue) => void;
}

export const IssuesList = ({ refreshTrigger = 0, onIssueClick }: IssuesListProps) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<IssueFilters>({
    page: 1,
    limit: 10
  });
  const [searchInput, setSearchInput] = useState('');
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadIssues = async () => {
    try {
      setLoading(true);
      const response = await issueService.getIssues(filters);
      setIssues(response.issues);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      
      // Si no hay issues en la página actual y no es la primera página, ir a la anterior
      if (response.issues.length === 0 && filters.page! > 1 && response.total > 0) {
        setFilters(prev => ({
          ...prev,
          page: prev.page! - 1
        }));
        return;
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar issues');
    } finally {
      setLoading(false);
    }
  };

  // Debounce para búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchInput || undefined,
        page: 1
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    loadIssues();
  }, [filters, refreshTrigger]);

  const handleFilterChange = (key: keyof IssueFilters, value: string | number) => {
    const numericValue = typeof value === 'string' ? Number(value) : value;
    
    setFilters(prev => ({
      ...prev,
      [key]: key === 'page' || key === 'limit' ? numericValue : value,
      page: key !== 'page' ? 1 : numericValue
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      open: { label: 'Abierto', class: 'status-open' },
      in_progress: { label: 'En Progreso', class: 'status-progress' },
      closed: { label: 'Cerrado', class: 'status-closed' }
    };
    return statusMap[status as keyof typeof statusMap] || { label: status, class: '' };
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      low: { label: 'Baja', class: 'priority-low' },
      medium: { label: 'Media', class: 'priority-medium' },
      high: { label: 'Alta', class: 'priority-high' }
    };
    return priorityMap[priority as keyof typeof priorityMap] || { label: priority, class: '' };
  };

  if (loading) return <div className="loading">Cargando issues...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="issues-list">
      {/* Filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar en título o descripción..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        
        <select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="open">Abierto</option>
          <option value="in_progress">En Progreso</option>
          <option value="closed">Cerrado</option>
        </select>
        
        <select
          value={filters.priority || ''}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">Todas las prioridades</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      {/* Lista */}
      {issues.length === 0 ? (
        <div className="empty-state">No se encontraron issues</div>
      ) : (
        <>
          <div className="issues-grid">
            {issues.map((issue) => (
              <div 
                key={issue._id} 
                className="issue-card clickable"
                onClick={() => onIssueClick?.(issue)}
              >
                <div className="issue-header">
                  <h3>{issue.title}</h3>
                  <div className="badges">
                    <span className={`badge ${getStatusBadge(issue.status).class}`}>
                      {getStatusBadge(issue.status).label}
                    </span>
                    <span className={`badge ${getPriorityBadge(issue.priority).class}`}>
                      {getPriorityBadge(issue.priority).label}
                    </span>
                  </div>
                </div>
                <p className="issue-description">{issue.description}</p>
                <div className="issue-footer">
                  <small>Creado: {new Date(issue.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación siempre visible */}
          <div className="pagination">
            <button
              onClick={() => handleFilterChange('page', filters.page! - 1)}
              disabled={filters.page === 1}
            >
              ← Anterior
            </button>
            
            <span className="pagination-info">
              Página {filters.page} de {totalPages || 1} ({total} issues total)
            </span>
            
            <button
              onClick={() => handleFilterChange('page', filters.page! + 1)}
              disabled={filters.page === totalPages || totalPages <= 1}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
