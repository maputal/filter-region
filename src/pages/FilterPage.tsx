import { useLoaderData, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useEffect } from 'react';
import { FaArrowDownLong } from "react-icons/fa6";

interface RegionData {
  provinces: { id: number; name: string }[]
  regencies: { id: number; province_id: number; name: string }[]
  districts: { id: number; regency_id: number; name: string }[]
}

interface Breadcrumb {
  label: string
  active?: boolean
}

export async function loader() {
  const res = await fetch("/data/indonesia_regions.json");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default function FilterPage() {
  const data = useLoaderData() as RegionData
  const [searchParams, setSearchParams] = useSearchParams()

  // Ambil value dari URL
  const province = searchParams.get('province') || ''
  const regency = searchParams.get('regency') || ''
  const district = searchParams.get('district') || ''  

  const provinceId = province ? Number(province) : null
  const regencyId = regency ? Number(regency) : null
  const districtId = district ? Number(district) : null

  const filteredRegencies = provinceId
    ? data.regencies.filter((r) => r.province_id === provinceId)
    : []

  const filteredDistricts = regencyId
    ? data.districts.filter((d) => d.regency_id === regencyId)
    : []

  const selectedProvince = data.provinces.find((p) => p.id === provinceId)
  const selectedRegency = filteredRegencies.find((r) => r.id === regencyId)
  const selectedDistrict = filteredDistricts.find((d) => d.id === districtId)

  /// Handle case ketika URL memiliki parameter yang tidak valid (misal: ?province=999)
  useEffect(() => {
    const params: Record<string, string> = {}

    if (selectedProvince) params.province = province
    if (selectedRegency) params.regency = regency
    if (selectedDistrict) params.district = district

    const hasInvalid =
      (province && !selectedProvince) ||
      (regency && !selectedRegency) ||
      (district && !selectedDistrict)

    if (hasInvalid) setSearchParams(params, { replace: true })
  }, [province, regency, district])

  function updateParams(params: {
    province?: string
    regency?: string
    district?: string
  }) {
    const newParams = new URLSearchParams(searchParams)

    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value)
      else newParams.delete(key)
    })

    setSearchParams(newParams)
  }

  function handleProvinceChange(value: string) {
    updateParams({ province: value, regency: '', district: '' })
  }

  function handleRegencyChange(value: string) {
    updateParams({ regency: value, district: '' })
  }

  function handleDistrictChange(value: string) {
    updateParams({ district: value })
  }

  function handleReset() {
    setSearchParams({})
  }

  // Build breadcrumbs
  const breadcrumbs: Breadcrumb[] = [{ label: 'Indonesia' }]

  if (selectedProvince) breadcrumbs.push({ label: selectedProvince.name })
  if (selectedRegency) breadcrumbs.push({ label: selectedRegency.name })
  if (selectedDistrict) breadcrumbs.push({ label: selectedDistrict.name, active: true })
  else if (selectedRegency)
    breadcrumbs[breadcrumbs.length - 1] = { label: selectedRegency.name, active: true }
  else if (selectedProvince)
    breadcrumbs[breadcrumbs.length - 1] = { label: selectedProvince.name, active: true }
  else breadcrumbs[0] = { label: 'Indonesia', active: true }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        provinces={data.provinces}
        regencies={filteredRegencies}
        districts={filteredDistricts}
        selectedProvince={province}
        selectedRegency={regency}
        selectedDistrict={district}
        onProvinceChange={handleProvinceChange}
        onRegencyChange={handleRegencyChange}
        onDistrictChange={handleDistrictChange}
        onReset={handleReset}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar breadcrumbs={breadcrumbs} />

        <main className="flex-1 flex flex-col items-center gap-0 px-8 py-16 bg-slate-100 text-center">
          {/* Province */}
          <div className="mb-2">
            <p className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-3">
              Provinsi
            </p>
            <h1 className="text-6xl font-extrabold text-gray-900 leading-none">
              {selectedProvince ? selectedProvince.name : (
                <span className="text-gray-200">—</span>
              )}
            </h1>
          </div>

          {/* Arrow */}
          <div className="my-6 text-gray-300">
            <FaArrowDownLong className="w-5 h-5 mx-auto" />
          </div>

          {/* Regency */}
          <div className="mb-2">
            <p className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-3">
              Kota / Kabupaten
            </p>
            <h2 className="text-5xl font-extrabold text-gray-900 leading-none">
              {selectedRegency ? selectedRegency.name : (
                <span className="text-gray-200">—</span>
              )}
            </h2>
          </div>

          {/* Arrow */}
          <div className="my-6 text-gray-300">
            <FaArrowDownLong className="w-5 h-5 mx-auto" />
          </div>

          {/* District */}
          <div>
            <p className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-3">
              Kecamatan
            </p>
            <h3 className="text-4xl font-extrabold text-gray-900 leading-none">
              {selectedDistrict ? selectedDistrict.name : (
                <span className="text-gray-200">—</span>
              )}
            </h3>
          </div>
        </main>
      </div>
    </div>
  )
}