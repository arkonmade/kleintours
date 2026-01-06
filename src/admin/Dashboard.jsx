import React from "react";
import DemographicCard from "../components/admin/DemographicCard";
import MonthlyTarget from "../components/admin/MonthlyTarget";
import StatisticsChart from "../components/admin/StatisticsChart";


const bookings = [
  {
    id: 'c1a2b3d4-e5f6-7890-ab12-cd34ef567890',
    profile_id: '11111111-2222-3333-4444-555555555555',
    item_type: 'car',
    item_id: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
    quantity: 1,
    total_price: 120.50,
    status: 'pending',
    start_date: '2026-01-10',
    end_date: '2026-01-12',
    created_at: '2026-01-06T06:00:00Z',
    updated_at: '2026-01-06T06:00:00Z'
  },
  {
    id: 'd2b3c4e5-f6a7-8901-bc23-de45fg678901',
    profile_id: '22222222-3333-4444-5555-666666666666',
    item_type: 'car',
    item_id: 'bbbbbbbb-cccc-dddd-eeee-ffffffffffff',
    quantity: 2,
    total_price: 250.00,
    status: 'confirmed',
    start_date: '2026-02-01',
    end_date: '2026-02-05',
    created_at: '2026-01-06T07:00:00Z',
    updated_at: '2026-01-06T07:00:00Z'
  },
  {
    id: 'e3c4d5f6-a7b8-9012-cd34-ef56gh789012',
    profile_id: '33333333-4444-5555-6666-777777777777',
    item_type: 'car',
    item_id: 'cccccccc-dddd-eeee-ffff-000000000000',
    quantity: 1,
    total_price: 75.00,
    status: 'cancelled',
    start_date: '2026-01-15',
    end_date: '2026-01-15',
    created_at: '2026-01-06T08:00:00Z',
    updated_at: '2026-01-06T08:00:00Z'
  },
  {
    id: 'f4d5e6g7-b8c9-0123-de45-fg67hi890123',
    profile_id: '44444444-5555-6666-7777-888888888888',
    item_type: 'car',
    item_id: 'dddddddd-eeee-ffff-0000-111111111111',
    quantity: 3,
    total_price: 360.00,
    status: 'completed',
    start_date: '2025-12-20',
    end_date: '2025-12-23',
    created_at: '2026-01-06T09:00:00Z',
    updated_at: '2026-01-06T09:00:00Z'
  },
  {
    id: 'g5e6f7h8-c9d0-1234-ef56-gh78ij901234',
    profile_id: '55555555-6666-7777-8888-999999999999',
    item_type: 'car',
    item_id: 'eeeeeeee-ffff-0000-1111-222222222222',
    quantity: 1,
    total_price: 50.00,
    status: 'no_show',
    start_date: '2026-01-05',
    end_date: '2026-01-05',
    created_at: '2026-01-06T10:00:00Z',
    updated_at: '2026-01-06T10:00:00Z'
  },
  {
    id: 'h6f7g8i9-d0e1-2345-fg67-hi89jk012345',
    profile_id: '66666666-7777-8888-9999-000000000000',
    item_type: 'car',
    item_id: 'ffffffff-0000-1111-2222-333333333333',
    quantity: 2,
    total_price: 200.00,
    status: 'pending',
    start_date: '2026-02-10',
    end_date: '2026-02-12',
    created_at: '2026-01-06T11:00:00Z',
    updated_at: '2026-01-06T11:00:00Z'
  },
  {
    id: 'i7g8h9j0-e1f2-3456-gh78-ij90kl123456',
    profile_id: '77777777-8888-9999-0000-111111111111',
    item_type: 'car',
    item_id: '00000000-1111-2222-3333-444444444444',
    quantity: 1,
    total_price: 95.00,
    status: 'confirmed',
    start_date: '2026-03-01',
    end_date: '2026-03-03',
    created_at: '2026-01-06T12:00:00Z',
    updated_at: '2026-01-06T12:00:00Z'
  },
  {
    id: 'j8h9i0k1-f2g3-4567-hi89-jk01lm234567',
    profile_id: '88888888-9999-0000-1111-222222222222',
    item_type: 'car',
    item_id: '11111111-2222-3333-4444-555555555555',
    quantity: 1,
    total_price: 80.00,
    status: 'completed',
    start_date: '2025-12-28',
    end_date: '2025-12-29',
    created_at: '2026-01-06T13:00:00Z',
    updated_at: '2026-01-06T13:00:00Z'
  },
  {
    id: 'k9i0j1l2-g3h4-5678-ij90-kl12mn345678',
    profile_id: '99999999-0000-1111-2222-333333333333',
    item_type: 'car',
    item_id: '22222222-3333-4444-5555-666666666666',
    quantity: 2,
    total_price: 150.00,
    status: 'pending',
    start_date: '2026-01-20',
    end_date: '2026-01-22',
    created_at: '2026-01-06T14:00:00Z',
    updated_at: '2026-01-06T14:00:00Z'
  }
];


const DashboardHome = () => {
  return (
    <div className="p-6 bg-light min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text">Dashboard</h1>
        <p className="text-secondary mt-1">
          Overview of customers, bookings, and targets
        </p>
      </div>
      {/* Dashboard Grid */}
      {/* Additional Summaries (Optional) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-5 dark:bg-white/[0.03]">
          <h3 className="text-lg font-semibold text-text">New Bookings</h3>
          <p className="mt-1 text-secondary text-sm">
            Bookings made this month
          </p>
          <p className="mt-4 text-2xl font-bold text-primary">324</p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 dark:bg-white/[0.03]">
          <h3 className="text-lg font-semibold text-text">Revenue</h3>
          <p className="mt-1 text-secondary text-sm">
            Total revenue this month
          </p>
          <p className="mt-4 text-2xl font-bold text-accent">$12,450</p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 dark:bg-white/[0.03]">
          <h3 className="text-lg font-semibold text-text">Messages</h3>
          <p className="mt-1 text-secondary text-sm">
            Customer inquiries this month
          </p>
          <p className="mt-4 text-2xl font-bold text-secondary">45</p>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Customer Demographics */}
        <DemographicCard />

        {/* Monthly Target */}
        <MonthlyTarget />
      </div>
      <div className="flex w-full">
        <StatisticsChart bookings={bookings} />
      </div>
    </div>
  );
};

export default DashboardHome;
