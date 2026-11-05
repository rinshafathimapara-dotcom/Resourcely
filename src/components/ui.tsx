import { Leaf, ArrowUpRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
export function Brand() { return <Link className="brand" to="/" aria-label="Green School AI home"><span className="brand-icon"><Leaf size={23}/></span><span>green school<span className="brand-ai">AI</span></span></Link>; }
export function PageHeading({eyebrow,title,description,action}:{eyebrow:string;title:string;description:string;action?:ReactNode}) { return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div>{action}</div>; }
export function Panel({title,subtitle,children,action,className=''}:{title:string;subtitle?:string;children:ReactNode;action?:ReactNode;className?:string}) { return <section className={`panel ${className}`}><div className="panel-heading"><div><h2>{title}</h2>{subtitle&&<p className="muted small">{subtitle}</p>}</div>{action}</div>{children}</section>; }
export function Metric({label,value,note,icon}:{label:string;value:string;note:string;icon:ReactNode}) { return <article className="metric"><div className="metric-top"><span>{label}</span><span className="metric-icon">{icon}</span></div><strong>{value}</strong><p>{note}</p></article>; }
export function EmptyState({title,description,action}:{title:string;description:string;action?:ReactNode}) { return <div className="empty-state"><span className="empty-icon"><Leaf/></span><h2>{title}</h2><p className="muted">{description}</p>{action}</div>; }
export function ErrorState({retry}:{retry:()=>void}) { return <div role="alert" className="empty-state"><AlertCircle/><h2>Unable to load school data</h2><p>Please try again.</p><button className="button primary" onClick={retry}>Try again</button></div>; }
export function TextLink({to,children}:{to:string;children:ReactNode}) { return <Link className="text-link" to={to}>{children}<ArrowUpRight size={15}/></Link>; }
