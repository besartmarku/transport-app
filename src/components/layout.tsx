import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <div
        className="fixed hidden md:block"
        style={{
          width: 1150.39,
          height: 584,
          left: 376.54,
          top: 200,

          background:
            'conic-gradient(from 167.75deg at 26.05% 40.64%, rgba(207, 238, 187, 0.881587) -18.97deg, #ABE1C9 8.74deg, #80CDD7 160.76deg, #7C9CE5 225.35deg, rgba(126, 163, 230, 0.22) 298.84deg, rgba(207, 238, 187, 0.881587) 341.03deg, #ABE1C9 368.74deg)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="fixed block md:hidden"
        style={{
          height: 584,
          left: 50,
          right: 50,
          top: 100,

          background:
            'conic-gradient(from 167.75deg at 26.05% 40.64%, rgba(207, 238, 187, 0.881587) -18.97deg, #ABE1C9 8.74deg, #80CDD7 160.76deg, #7C9CE5 225.35deg, rgba(126, 163, 230, 0.22) 298.84deg, rgba(207, 238, 187, 0.881587) 341.03deg, #ABE1C9 368.74deg)',
          filter: 'blur(150px)',
          transform: 'rotate(-90deg)',
        }}
      />

      <div className="relative z-10 flex h-screen w-screen items-start pt-32 md:items-center md:justify-center md:pt-0">
        <div className="flex min-h-[260px] w-full flex-col justify-center rounded-2xl border-slate-100 bg-white px-3 pt-5 pb-5 md:w-[734px] md:border md:px-20 md:pb-10 md:pt-16 md:shadow lg:min-h-[334px]">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export { Layout }
