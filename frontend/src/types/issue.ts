export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
}

export interface UpdateIssueRequest extends Partial<CreateIssueRequest> {}

export interface IssuesResponse {
  issues: Issue[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IssueFilters {
  status?: string;
  priority?: string;
  search?: string;
  page?: number;
  limit?: number;
}