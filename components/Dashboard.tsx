import Body from './Body'
import Right from './Right'
import Sidebar from './Sidebar'

export default function Dashboard() {
  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body />
      <Right />

      <div className="fixed bottom-0 left-0 right-0 z-50"></div>
    </main>
  )
}
