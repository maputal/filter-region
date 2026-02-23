interface BreadcrumbItem {
  label: string
  active?: boolean
}

interface NavbarProps {
  breadcrumbs: BreadcrumbItem[]
}

export default function Navbar({ breadcrumbs }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-14 px-6">


        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                <span className={item.active ? 'font-600 font-bold text-blue-600' : 'text-gray-400 font-400'}>
                  {item.label}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </nav>
  )
}
