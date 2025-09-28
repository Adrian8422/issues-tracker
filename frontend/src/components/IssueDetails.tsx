import { useState, useEffect } from 'react';
import { issueService } from '../services/issueService';
import type { Issue } from '../types/issue';

interface IssueDetailsProps {
  issueId: string;
  onEdit: (issue: Issue) => void;
  onClose: () => void;
  onDelete?: (issueId: string) => void;
}

export const IssueDetails = ({ issueId, onEdit, onClose, onDelete }: IssueDetailsProps) => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadIssue = async () => {
      try {
        setLoading(true);
        const issueData = await issueService.getIssue(issueId);
        setIssue(issueData);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error al cargar el issue');
      } finally {
        setLoading(false);
      }
    };

    loadIssue();
  }, [issueId]);

  const handleDelete = async () => {
    if (!issue || !onDelete) return;
    
    if (confirm('¿Estás seguro de que quieres eliminar este issue?')) {
      try {
        await issueService.deleteIssue(issue._id);
        onDelete(issue._id);
        onClose();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error al eliminar el issue');
      }
    }
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

  if (loading) {
    return (
      <div className="issue-details">
        <div className="issue-details-loading">
          <div className="loading-spinner"></div>
          <p>Cargando detalles...</p>
        </div>
      </div>
    );
  }
  if (error) return <div className="error">{error}</div>;
  if (!issue) return <div className="error">Issue no encontrado</div>;

  return (
    <div className="issue-details">
      <div className="issue-details-header">
        <h2>{issue.title}</h2>
        <div className="badges">
          <span className={`badge ${getStatusBadge(issue.status).class}`}>
            {getStatusBadge(issue.status).label}
          </span>
          <span className={`badge ${getPriorityBadge(issue.priority).class}`}>
            {getPriorityBadge(issue.priority).label}
          </span>
        </div>
      </div>

      <div className="issue-details-content">
        <div className="issue-description">
          <h3>Descripción</h3>
          <p>{issue.description || 'Sin descripción'}</p>
        </div>

        <div className="issue-metadata">
          <div className="metadata-item">
            <strong>Creado:</strong> {new Date(issue.createdAt).toLocaleString()}
          </div>
          <div className="metadata-item">
            <strong>Actualizado:</strong> {new Date(issue.updatedAt).toLocaleString()}
          </div>
          <div className="metadata-item">
            <strong>ID:</strong> {issue._id}
          </div>
        </div>
      </div>

      <div className="issue-details-actions">
        <button onClick={() => onEdit(issue)} className="btn-primary">
          Editar
        </button>
        {onDelete && (
          <button onClick={handleDelete} className="btn-danger">
            Eliminar
          </button>
        )}
        <button onClick={onClose} className="btn-secondary">
          Cerrar
        </button>
      </div>
    </div>
  );
};
