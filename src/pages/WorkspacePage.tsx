import { Link, useLocation } from 'react-router-dom';
import { PageHeading, EmptyState } from '../components/ui';
import { navigation } from '../components/Layout';
const descriptions:Record<string,{stage:string;text:string}>={
 inventory:{stage:'Stage 3',text:'Inventory transactions, custom categories, and stock records will connect to your team’s agreed data model.'},
 purchases:{stage:'Stage 3',text:'Purchase records and order history will be implemented with the backend integration.'},
 consumption:{stage:'Stage 3',text:'Usage and actual waste will be recorded separately, with units and dates.'},
 utilities:{stage:'Stage 3',text:'Meter readings, billing periods, costs, and historical consumption will have their own tracking workflow.'},
 assets:{stage:'Stage 3',text:'Reusable assets will track condition, location, repair history, lifespan, and disposal.'},
 recommendations:{stage:'Stage 4',text:'Transparent demand forecasts will use consumption, reservations, incoming orders, safety stock, and calendar context.'},
 'purchase-orders':{stage:'Stage 4',text:'Editable, rule-based order suggestions, approval states, and print and CSV exports will be implemented here. No supplier is contacted by this demo.'},
 impact:{stage:'Stage 4',text:'Actual waste, potential purchasing reductions, and emissions estimates will stay distinct. Emissions require documented conversion factors.'},
 suppliers:{stage:'Stage 3',text:'Supplier records and lead times will use the schema supplied by your teammate.'},
 calendar:{stage:'Stage 4',text:'School holidays and events will provide context for demand forecasts.'},
 reports:{stage:'Stage 5',text:'Validated reporting and exports will follow the implemented resource workflows.'},
 settings:{stage:'Stage 2',text:'Authentication, school membership, and user access require your teammate’s Supabase schema and Row Level Security policies.'},
};
export default function WorkspacePage(){const key=useLocation().pathname.split('/').at(-1)!;const page=navigation.find(n=>n.path===key);const detail=descriptions[key];return <><PageHeading eyebrow="YOUR WORKSPACE" title={page?.label??'Workspace'} description="A dedicated space for the next part of your school’s resource story."/><div className="panel"><EmptyState title={`Planned for ${detail?.stage??'a future stage'}`} description={detail?.text??'This workflow is not implemented in Stage 1.'} action={<Link className="button primary" to="/app/dashboard">Back to the working dashboard</Link>}/></div><p className="scope-note">Stage 1 includes the landing page, dashboard, navigation, and typed demo service. This page is a clearly labelled route placeholder.</p></>}
