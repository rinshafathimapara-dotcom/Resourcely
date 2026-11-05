export type TrackingMethod = 'consumable' | 'utility' | 'asset' | 'transport';
export interface ResourceCategory { id: string; name: string; tracking: TrackingMethod }
export interface InventoryItem {
  id: string; name: string; categoryId: string; unit: string;
  usableStock: number; reservedStock: number; reorderPoint: number; unitPrice: number;
}
export interface UtilityReading { month: string; electricityKwh: number; waterM3: number }
export interface Asset { id: string; name: string; location: string; condition: 'Good' | 'Needs repair' | 'Retired'; purchasedOn: string }
export interface ProcurementMonth { month: string; expenditure: number; budget: number }
export interface ResourceActivity { id: string; title: string; detail: string; recordedAt: string; type: 'received' | 'usage' | 'waste' }
export interface DashboardData {
  school: string; period: string; currency: string; procurement: number; inventoryValue: number;
  recordedWasteKg: number; pendingOrders: number; potentialAvoidablePurchases: number | null;
  spending: ProcurementMonth[]; utilities: UtilityReading[]; inventory: InventoryItem[];
  activities: ResourceActivity[];
}
export interface SchoolDataService { getDashboard(signal?: AbortSignal): Promise<DashboardData> }
