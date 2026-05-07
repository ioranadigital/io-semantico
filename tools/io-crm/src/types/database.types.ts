export interface Database {
  public: {
    Tables: {
      users: {
        Row: { id: string; email: string; role: string; created_at: string }
        Insert: { id?: string; email: string; role?: string; created_at?: string }
        Update: { email?: string; role?: string }
      }
      portal_users: {
        Row: { id: string; user_id: string; role: 'cliente' | 'interno' }
        Insert: { id?: string; user_id: string; role: 'cliente' | 'interno' }
        Update: { role?: 'cliente' | 'interno' }
      }
      accounts: {
        Row: {
          id: string
          name: string
          website?: string
          sector?: string
          status: 'Activo' | 'Inactivo'
          health_score: number
          portal_active: boolean
          created_at: string
        }
        Insert: any
        Update: any
      }
      contacts: {
        Row: {
          id: string
          account_id: string
          name: string
          email: string
          phone?: string
          position?: string
          origin: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      leads: {
        Row: {
          id: string
          company: string
          contact_name: string
          email: string
          phone?: string
          sector?: string
          budget_range?: string
          urgency?: 'Alta' | 'Media' | 'Baja'
          status: 'Nuevo' | 'Cualificado' | 'Perdido'
          audit_status?: 'pending' | 'in_progress' | 'done'
          audit_speed?: number
          converted_to_contact_id?: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      deals: {
        Row: {
          id: string
          account_id: string
          title: string
          value: number
          stage: string
          probability: number
          expected_close: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      projects: {
        Row: {
          id: string
          account_id: string
          name: string
          status: 'Pendiente' | 'En curso' | 'Completado' | 'Cancelado'
          start_date?: string
          end_date?: string
          sop_template_id?: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      tasks: {
        Row: {
          id: string
          project_id: string
          title: string
          description?: string
          status: 'Pendiente' | 'En curso' | 'Completado'
          assigned_to?: string
          due_date?: string
          hours_budget: number
          position: number
          created_at: string
        }
        Insert: any
        Update: any
      }
      tickets: {
        Row: {
          id: string
          account_id: string
          contact_id?: string
          reference: string
          title: string
          description: string
          severity: 'Crítico' | 'Alto' | 'Medio' | 'Bajo'
          status: 'Abierto' | 'En progreso' | 'Resuelto' | 'Cerrado'
          created_at: string
          resolved_at?: string
        }
        Insert: any
        Update: any
      }
      proposals: {
        Row: {
          id: string
          account_id: string
          title: string
          value: number
          status: 'Enviada' | 'Aceptada' | 'Rechazada'
          sent_at: string
          accepted_at?: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      timelogs: {
        Row: {
          id: string
          project_id: string
          user_id: string
          description: string
          hours: number
          logged_at: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      expenses: {
        Row: {
          id: string
          project_id: string
          category: string
          amount: number
          description: string
          receipt_url?: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      activity_log: {
        Row: {
          id: string
          account_id?: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      n8n_logs: {
        Row: {
          id: string
          workflow_id: string
          workflow_name: string
          status: 'success' | 'error' | 'running'
          message?: string
          created_at: string
        }
        Insert: any
        Update: any
      }
      sop_templates: {
        Row: {
          id: string
          name: string
          description?: string
          modules: string[]
          created_at: string
        }
        Insert: any
        Update: any
      }
      retainers: {
        Row: {
          id: string
          account_id: string
          hours_allocated: number
          hours_used: number
          month: string
          created_at: string
        }
        Insert: any
        Update: any
      }
    }
    Views: {
      v_retainer_status: {
        Row: {
          id: string
          account_id: string
          hours_allocated: number
          hours_used: number
          hours_remaining: number
          month: string
          active: boolean
        }
      }
      v_client_timeline: {
        Row: {
          account_id: string
          date: string
          entity_type: string
          entity_id: string
          title: string
          description?: string
        }
      }
      v_pipeline_metrics: {
        Row: {
          stage: string
          deal_count: number
          total_value: number
          avg_probability: number
        }
      }
    }
  }
}

export type Lead = Database['public']['Tables']['leads']['Row']
export type Account = Database['public']['Tables']['accounts']['Row']
export type Contact = Database['public']['Tables']['contacts']['Row']
export type Deal = Database['public']['Tables']['deals']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type Proposal = Database['public']['Tables']['proposals']['Row']
export type Timelog = Database['public']['Tables']['timelogs']['Row']
export type ActivityLog = Database['public']['Tables']['activity_log']['Row']
export type N8nLog = Database['public']['Tables']['n8n_logs']['Row']
