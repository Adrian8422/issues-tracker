import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { IssuesList } from '../components/IssuesList';
import { IssueForm } from '../components/IssueForm';
import { IssueDetails } from '../components/IssueDetails';
import { Modal } from '../components/Modal';
import { issueService } from '../services/issueService';
import type { Issue, CreateIssueRequest } from '../types/issue';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleCreateIssue = async (data: CreateIssueRequest) => {
    setLoading(true);
    try {
      await issueService.createIssue(data);
      setShowCreateModal(false);
      setRefreshTrigger(prev => prev + 1);
      setNotification('Issue creado exitosamente');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEditIssue = async (data: CreateIssueRequest) => {
    if (!editingIssue) return;
    
    setLoading(true);
    try {
      await issueService.updateIssue(editingIssue._id, data);
      setEditingIssue(null);
      setSelectedIssueId(null);
      setRefreshTrigger(prev => prev + 1);
      setNotification('Issue actualizado exitosamente');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssueId(issue._id);
  };

  const handleEditFromDetails = (issue: Issue) => {
    setEditingIssue(issue);
    setSelectedIssueId(null);
  };

  const handleDeleteIssue = (issueId: string) => {
    setRefreshTrigger(prev => prev + 1);
    setNotification('Issue eliminado exitosamente');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Issues Tracker</h1>
        <div className="user-info">
          <span>Bienvenido: {user?.email}</span>
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>
      
      <main className="dashboard-main">
        <div className="dashboard-actions">
          <button 
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Crear Issue
          </button>
        </div>
        
        <IssuesList 
          refreshTrigger={refreshTrigger}
          onIssueClick={handleIssueClick}
        />
      </main>

      {/* Notificación */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Modal Crear Issue */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <IssueForm
          onSubmit={handleCreateIssue}
          onCancel={() => setShowCreateModal(false)}
          loading={loading}
        />
      </Modal>

      {/* Modal Ver Detalles Issue */}
      <Modal isOpen={!!selectedIssueId} onClose={() => setSelectedIssueId(null)}>
        {selectedIssueId && (
          <IssueDetails
            issueId={selectedIssueId}
            onEdit={handleEditFromDetails}
            onClose={() => setSelectedIssueId(null)}
            onDelete={handleDeleteIssue}
          />
        )}
      </Modal>

      {/* Modal Editar Issue */}
      <Modal isOpen={!!editingIssue} onClose={() => setEditingIssue(null)}>
        {editingIssue && (
          <IssueForm
            issue={editingIssue}
            onSubmit={handleEditIssue}
            onCancel={() => setEditingIssue(null)}
            loading={loading}
          />
        )}
      </Modal>
    </div>
  );
};
