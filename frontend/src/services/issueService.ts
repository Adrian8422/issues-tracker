import api from './api';
import type { Issue, CreateIssueRequest, UpdateIssueRequest, IssuesResponse, IssueFilters } from '../types/issue';

const getIssues = async (filters: IssueFilters = {}): Promise<IssuesResponse> => {
  const params = new URLSearchParams();
  
  if (filters.status) params.append('status', filters.status);
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const response = await api.get(`/issues?${params}`);
  
  // Mapear la respuesta del backend al formato esperado
  return {
    issues: response.data.issues,
    total: response.data.pagination.total,
    page: response.data.pagination.page,
    totalPages: response.data.pagination.pages
  };
};

const getIssue = async (id: string): Promise<Issue> => {
  const response = await api.get(`/issues/${id}`);
  return response.data;
};

const createIssue = async (issue: CreateIssueRequest): Promise<Issue> => {
  const response = await api.post<Issue>('/issues', issue);
  return response.data;
};

const updateIssue = async (id: string, issue: UpdateIssueRequest): Promise<Issue> => {
  const response = await api.put<Issue>(`/issues/${id}`, issue);
  return response.data;
};

const deleteIssue = async (id: string): Promise<void> => {
  await api.delete(`/issues/${id}`);
};

export const issueService = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue
};
