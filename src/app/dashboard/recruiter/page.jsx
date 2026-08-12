"use client";

import React from 'react';
import { useSession } from '@/lib/auth-client';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { FileText, Users, Zap, CheckCircle2 } from 'lucide-react';

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  const recruiterStats = [
    { id: '1', title: 'Total Job Posts', value: '48', icon: FileText, trend: '+4', isPositive: true },
    { id: '2', title: 'Total Applicants', value: '1,284', icon: Users, trend: '+12%', isPositive: true },
    { id: '3', title: 'Active Jobs', value: '18', icon: Zap },
    { id: '4', title: 'Jobs Closed', value: '32', icon: CheckCircle2 },
  ];

  if (isPending) {
    return <div>Loading....</div>;
  }

  const user = session?.user;

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">
        Welcome Back, {user?.name || 'Recruiter'}
      </h2>

      <DashboardStats stats={recruiterStats} />
    </div>
  );
};

export default RecruiterDashboardHomePage;