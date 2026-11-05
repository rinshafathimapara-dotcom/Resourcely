import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { Leaf, LayoutDashboard, Package, ShoppingBag, ClipboardList, Droplets, Monitor, Sparkles, FilePlus2, Sprout, Truck, CalendarDays, ChartNoAxesCombined, Settings, Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Brand } from './ui';
export const navigation = [
  {path:'dashboard',label:'Overview',icon:LayoutDashboard}, {path:'inventory',label:'Inventory',icon:Package},
  {path:'purchases',label:'Purchases',icon:ShoppingBag}, {path:'consumption',label:'Consumption & waste',icon:ClipboardList},
  {path:'utilities',label:'Electricity & water',icon:Droplets}, {path:'assets',label:'Assets',icon:Monitor},
  {path:'recommendations',label:'AI recommendations',icon:Sparkles}, {path:'purchase-orders',label:'Purchase orders',icon:FilePlus2},
  {path:'impact',label:'Sustainability impact',icon:Sprout}, {path:'suppliers',label:'Suppliers',icon:Truck},
  {path:'calendar',label:'School calendar',icon:CalendarDays}, {path:'reports',label:'Reports',icon:ChartNoAxesCombined},
  {path:'settings',label:'Settings & users',icon:Settings},
];
export default function Layout() {
  const [open,setOpen]=useState(false);
  return <div className="app-shell"><a className="skip-link" href="#main">Skip to content</a>{open&&<button className="sidebar-backdrop" aria-label="Close navigation" onClick={()=>setOpen(false)}/>}
    <aside id="sidebar" className={`sidebar ${open?'is-open':''}`}><div className="sidebar-brand"><Brand/><button className="icon-button mobile-only" aria-label="Close navigation" onClick={()=>setOpen(false)}><X/></button></div>
      <div className="school-switch"><span className="school-avatar">EA</span><div><strong>Evergreen Academy</strong><span>Demo school</span></div><ChevronDown size={14}/></div>
      <p className="nav-label">WORKSPACE</p><nav aria-label="Workspace">{navigation.map(({path,label,icon:Icon},i)=><div key={path}>{i===6&&<p className="nav-label intelligence-label">INTELLIGENCE & PLANNING</p>}<NavLink to={`/app/${path}`} onClick={()=>setOpen(false)}><Icon size={18}/><span>{label}</span>{path==='recommendations'&&<span className="tiny-badge">AI</span>}</NavLink></div>)}</nav>
      <div className="sidebar-bottom"><div className="demo-card"><Leaf size={19}/><strong>A little greener, every day.</strong><p>Better decisions start with a clearer picture.</p><Link to="/app/impact">Explore your impact <ArrowUpRight size={14}/></Link></div><div className="profile"><span className="avatar">JD</span><div><strong>Jamie Davis</strong><span>Demo administrator</span></div></div></div>
    </aside><div className="workspace"><header className="topbar"><div className="breadcrumb"><button className="icon-button mobile-only" aria-label="Open navigation" aria-expanded={open} aria-controls="sidebar" onClick={()=>setOpen(true)}><Menu/></button><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>Evergreen Academy</strong></div><div className="topbar-right"><span className="demo-pill"><span/>Demo mode</span><span className="avatar small-avatar" aria-label="Demo user Jamie Davis">JD</span></div></header>
    <div className="demo-banner">You’re exploring a demo workspace. All school records and metrics are sample data.</div><main id="main" tabIndex={-1}><Outlet/></main><footer className="app-footer"><span>Green School AI · Thoughtful resources. Lasting impact.</span><span>Stage 1 preview</span></footer></div></div>;
}
