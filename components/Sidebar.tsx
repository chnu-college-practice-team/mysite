import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from '@heroicons/react/solid'

export default function Sidebar() {
  return (
    <section className="fixed top-0 z-40 flex h-screen w-[90px] flex-col items-center space-y-8 bg-black p-4">
      <div className="flex flex-col space-y-8">
        <HomeIcon className="sidebar-icon text-white opacity-[0.85]" />
        <ChartBarIcon className="sidebar-icon" />
        <ClockIcon className="sidebar-icon" />
        <DotsHorizontalIcon className="sidebarIcon" />
      </div>
    </section>
  )
}
