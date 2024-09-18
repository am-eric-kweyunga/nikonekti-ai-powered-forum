import { DashbordWrapper } from '@/lib/profivers'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashbordWrapper>{ children }</DashbordWrapper>
}

export default DashboardLayout