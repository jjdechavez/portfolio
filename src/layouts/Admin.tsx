import React from 'react';
import { faChartBar, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/Sidebar';
import DashboardFooter from '@/components/dashboard/Footer';

export default function Admin({ children }) {
  return (
    <>
      <SideBar />
      <div className="relative md:ml-64 bg-gray-100 h-screen">
        <Navbar />
        <div className="relative bg-gray-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              <div className="flex flex-wrap">
                <Card
                  title="Projects"
                  length={25}
                  percent={30}
                  icon={{ display: faChartBar, color: 'red' }}
                  href="/dashboard/projects"
                />
                <Card
                  title="Journey"
                  length={25}
                  percent={30}
                  icon={{ display: faHourglassHalf, color: 'purple' }}
                  href="/dashboard/journey"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full -m-24">
          {children}
          <DashboardFooter />
        </div>
      </div>
    </>
  );
}
