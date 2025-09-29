import { useState, useEffect } from 'react';
import type { Issue, CreateIssueRequest } from '../types/issue';

interface IssueFormProps {
  issue?: Issue;
  onSubmit: (data: CreateIssueRequest) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const IssueForm = ({ issue, onSubmit, onCancel, loading = false }: IssueFormProps) => {
  const [formData, setFormData] = useState<CreateIssueRequest>({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (issue) {
      setFormData({
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority
      });
    }
  }, [issue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.title.length < 3 || formData.title.length > 100) {
      setError('El título debe tener entre 3 y 100 caracteres');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al guardar el issue');
    }
  };

  const handleChange = (field: keyof CreateIssueRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="issue-form-container">
      <form onSubmit={handleSubmit} className="issue-form">
        <h2>{issue ? 'Editar Issue' : 'Crear Nuevo Issue'}</h2>
        
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Título del issue (3-100 caracteres)"
            required
            minLength={3}
            maxLength={100}
          />
        </div>
        
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Descripción detallada del issue"
            rows={4}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Estado</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value as any)}
            >
              <option value="open">Abierto</option>
              <option value="in_progress">En Progreso</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Prioridad</label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value as any)}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : (issue ? 'Actualizar Issue' : 'Crear Issue')}
          </button>
        </div>
      </form>
    </div>
  );
};
