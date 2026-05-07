import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '@/components/layout/Layout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { SkeletonLoader } from '@/components/shared/SkeletonLoader'
import { Toast } from '@/components/shared/Toast'

const Login = lazy(() => import('@/pages/auth/Login'))
const Dashboard = lazy(() => import('@/pages/crm/Dashboard'))
const Leads = lazy(() => import('@/pages/crm/Leads'))
const LeadDetail = lazy(() => import('@/pages/crm/LeadDetail'))
const Contacts = lazy(() => import('@/pages/crm/Contacts'))
const Pipeline = lazy(() => import('@/pages/crm/Pipeline'))
const Proposals = lazy(() => import('@/pages/crm/Proposals'))
const Clients = lazy(() => import('@/pages/crm/Clients'))
const ClientDetail = lazy(() => import('@/pages/crm/ClientDetail'))
const Tickets = lazy(() => import('@/pages/crm/Tickets'))
const TicketDetail = lazy(() => import('@/pages/crm/TicketDetail'))
const Projects = lazy(() => import('@/pages/operations/Projects'))
const Maintenance = lazy(() => import('@/pages/operations/Maintenance'))
const Tasks = lazy(() => import('@/pages/operations/Tasks'))
const Gantt = lazy(() => import('@/pages/operations/Gantt'))
const Deliverables = lazy(() => import('@/pages/operations/Deliverables'))
const TimeTracking = lazy(() => import('@/pages/profitability/TimeTracking'))
const Expenses = lazy(() => import('@/pages/profitability/Expenses'))
const Profitability = lazy(() => import('@/pages/profitability/Profitability'))
const Analytics = lazy(() => import('@/pages/reports/Analytics'))
const Activity = lazy(() => import('@/pages/communication/Activity'))
const Docs = lazy(() => import('@/pages/communication/Docs'))
const PortalConfig = lazy(() => import('@/pages/communication/PortalConfig'))
const PortalPreview = lazy(() => import('@/pages/communication/PortalPreview'))
const SopTemplates = lazy(() => import('@/pages/config/SopTemplates'))
const Users = lazy(() => import('@/pages/config/Users'))
const Automations = lazy(() => import('@/pages/n8n/Automations'))
const N8nLogs = lazy(() => import('@/pages/n8n/N8nLogs'))
const Webhooks = lazy(() => import('@/pages/n8n/Webhooks'))
const ClientPortal = lazy(() => import('@/pages/auth/ClientPortal'))

function App() {
  return (
    <>
      <Suspense fallback={<SkeletonLoader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/portal" element={<ClientPortal />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/leads/:id" element={<LeadDetail />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/:id" element={<ClientDetail />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/gantt" element={<Gantt />} />
              <Route path="/deliverables" element={<Deliverables />} />
              <Route path="/time-tracking" element={<TimeTracking />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/profitability" element={<Profitability />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/portal-config" element={<PortalConfig />} />
              <Route path="/portal-preview" element={<PortalPreview />} />
              <Route path="/sop" element={<SopTemplates />} />
              <Route path="/users" element={<Users />} />
              <Route path="/automations" element={<Automations />} />
              <Route path="/n8n-logs" element={<N8nLogs />} />
              <Route path="/webhooks" element={<Webhooks />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
      <Toast />
    </>
  )
}

export default App
