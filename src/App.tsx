import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Layout, { navigation } from './components/Layout';
import { EmptyState } from './components/ui';
import Landing from './pages/Landing';
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));
import Auth from './pages/Auth';
import WorkspacePage from './pages/WorkspacePage';
export default function App(){return <Suspense fallback={<div role="status" className="loading-state">Loading workspace…</div>}><Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Auth/>}/><Route path="/register" element={<Auth register/>}/><Route path="/app" element={<Layout/>}><Route index element={<Navigate to="dashboard" replace/>}/><Route path="dashboard" element={<Dashboard/>}/>{navigation.filter(n=>n.path!=='dashboard').map(n=><Route key={n.path} path={n.path} element={<WorkspacePage/>}/>)}</Route><Route path="*" element={<EmptyState title="This page isn’t here" description="Let’s find your way back to a greener outlook." action={<Link className="button primary" to="/">Go home</Link>}/>}/></Routes></Suspense>}
