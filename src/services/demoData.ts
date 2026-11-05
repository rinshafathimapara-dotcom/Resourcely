import type { DashboardData, ResourceCategory } from '../types';
export const categories: ResourceCategory[] = [
  { id:'paper', name:'Paper', tracking:'consumable' },
  { id:'plastic', name:'Plastic', tracking:'consumable' },
  { id:'books', name:'Textbooks & library books', tracking:'asset' },
  { id:'stationery', name:'Stationery', tracking:'consumable' },
  { id:'electronics', name:'Computers & electronics', tracking:'asset' },
  { id:'electricity', name:'Electricity', tracking:'utility' },
  { id:'water', name:'Water', tracking:'utility' },
  { id:'food', name:'Food & canteen', tracking:'consumable' },
  { id:'cleaning', name:'Cleaning supplies', tracking:'consumable' },
  { id:'furniture', name:'Furniture', tracking:'asset' },
  { id:'uniforms', name:'Uniforms', tracking:'consumable' },
  { id:'transport', name:'Transportation & fuel', tracking:'transport' },
];
export const demoDashboard: DashboardData = {
  school:'Evergreen Academy', period:'October 2026', currency:'USD', procurement:18450, inventoryValue:32780,
  recordedWasteKg:142, pendingOrders:3, potentialAvoidablePurchases:null,
  spending:[{month:'May',expenditure:15200,budget:20000},{month:'Jun',expenditure:16800,budget:20000},{month:'Jul',expenditure:11500,budget:20000},{month:'Aug',expenditure:19200,budget:20000},{month:'Sep',expenditure:21600,budget:22000},{month:'Oct',expenditure:18450,budget:22000}],
  utilities:[{month:'May',electricityKwh:14200,waterM3:248},{month:'Jun',electricityKwh:15100,waterM3:270},{month:'Jul',electricityKwh:9200,waterM3:180},{month:'Aug',electricityKwh:12600,waterM3:212},{month:'Sep',electricityKwh:16100,waterM3:291},{month:'Oct',electricityKwh:14820,waterM3:264}],
  inventory:[
    {id:'P001',name:'A4 recycled paper',categoryId:'paper',unit:'reams',usableStock:42,reservedStock:12,reorderPoint:50,unitPrice:5.5},
    {id:'S002',name:'Whiteboard markers',categoryId:'stationery',unit:'boxes',usableStock:18,reservedStock:4,reorderPoint:20,unitPrice:12},
    {id:'C003',name:'Eco surface cleaner',categoryId:'cleaning',unit:'litres',usableStock:64,reservedStock:10,reorderPoint:25,unitPrice:4},
    {id:'S004',name:'Writing notebooks',categoryId:'stationery',unit:'books',usableStock:320,reservedStock:60,reorderPoint:150,unitPrice:2.5},
  ],
  activities:[
    {id:'a1',title:'Recycled paper received',detail:'60 reams · Main storeroom',recordedAt:'2026-10-28T09:15:00Z',type:'received'},
    {id:'a2',title:'Canteen food waste recorded',detail:'8.4 kg · Lunch service',recordedAt:'2026-10-28T08:30:00Z',type:'waste'},
    {id:'a3',title:'Stationery issued to classrooms',detail:'24 notebooks · Science department',recordedAt:'2026-10-27T12:00:00Z',type:'usage'},
  ],
};
