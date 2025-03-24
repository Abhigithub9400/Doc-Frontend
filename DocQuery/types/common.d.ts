import type { EVENT_SOURCE } from '~/enums';

export interface INavLink {
  key: string;
  name: string;
  icon: string;
  route: string;
}

export interface ICardContent {
  _id: string;
  tenant_code?: string;
  name: string;
  description?: string;
  timestamp: number;
  status: boolean;
}

export interface IMenuItem {
  label: string;
  action?: string;
}

export interface IValidationRule {
  message: string;
  valid: boolean;
}

export interface ShowConfirmOptions {
  header?: string;
  message?: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  icon?: string;
  acceptProps?: Record<string, string>;
  rejectProps?: Record<string, string>;
  accept?: () => void;
  reject?: () => void;
}
export type ShowConfirm = (options: ShowConfirmOptions) => Promise<void>;

interface AlertTypeOptions {
  severity: 'success' | 'warn' | 'info' | 'error' | 'secondary' | undefined;
  summary: string;
  detail?: string;
  life?: number;
}
export type ShowToast = (options: AlertTypeOptions) => void;

export interface PaginationOption {
  is_active?: boolean;
  limit?: number;
  page_number?: number;
  search_text?: string;
  sort_key?: string;
  sort_order?: string;
}

export interface IActionDropdownItem {
  label: string;
  action: null | boolean;
}

export interface IFilterActionsPayload {
  source: EVENT_SOURCE;
  event: Event;
  payload: { data: unknown };
}

export interface IPagination {
  currentPage: number;
  perPage: number;
}
