import { BiWorld } from "react-icons/bi";
import { LiaMapSolid } from "react-icons/lia";
import { MdOutlineLocationCity, MdOutlineFilterAltOff } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { FaChevronDown } from "react-icons/fa";

interface Option {
  id: number
  name: string
}

interface SidebarProps {
  provinces: Option[]
  regencies: Option[]
  districts: Option[]
  selectedProvince: string
  selectedRegency: string
  selectedDistrict: string
  onProvinceChange: (value: string) => void
  onRegencyChange: (value: string) => void
  onDistrictChange: (value: string) => void
  onReset: () => void
}

function ComboboxIcon({ type }: { type: 'province' | 'regency' | 'district' | 'world' | 'reset' | 'arrow'}) {
  if (type === 'province') {
    return (
      <LiaMapSolid className="text-gray-400 flex-shrink-0" />
    )
  }
  if (type === 'regency') {
    return (
      <MdOutlineLocationCity className="text-gray-400 flex-shrink-0" />
    )
  }
  if (type === 'world') {
    return (
      <BiWorld className="text-blue-600" />
    )
  }
  if (type === 'reset') {
    return (
      <MdOutlineFilterAltOff className="text-gray-400 flex-shrink-0" />
    )
  }
  if (type === 'arrow') {
    return (
      <FaChevronDown className="text-gray-400 flex-shrink-0" />
    )
  }
  return (
    <TfiLocationPin className="text-gray-400 flex-shrink-0" />
  )
}

export default function Sidebar({
  provinces,
  regencies,
  districts,
  selectedProvince,
  selectedRegency,
  selectedDistrict,
  onProvinceChange,
  onRegencyChange,
  onDistrictChange,
  onReset,
}: SidebarProps) {

  return (
    <aside className="w-70 flex-shrink-0 bg-slate-100 border-r border-gray-100 shadow-sm h-screen sticky top-0 flex flex-col">
      <div className="flex items-center gap-2.5 h-14 px-5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shadow-sm">
          <ComboboxIcon type="world" />
        </div>
        <span className="text-md font-700 font-bold text-gray-800 tracking-tight">Frontend Assessment</span>
      </div>

      <div className="flex-1 overflow-y-auto p-5 py-16">
        <p className="text-[10px] font-700 tracking-widest text-gray-400 uppercase mb-5">
          Filter Wilayah
        </p>

        <div className="space-y-5">
          {/* Provinsi */}
          <div>
            <label className="block text-[10px] font-700 tracking-widest text-gray-400 uppercase mb-2">
              Provinsi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <ComboboxIcon type="province" />
              </div>
              <select
                name="province"
                value={selectedProvince}
                onChange={(e) => onProvinceChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm font-medium bg-slate-100 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ComboboxIcon type="arrow" />
              </div>
            </div>
          </div>

          {/* Kota/Kabupaten */}
          <div>
            <label className="block text-[10px] font-700 tracking-widest text-gray-400 uppercase mb-2">
              Kota/Kabupaten
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <ComboboxIcon type="regency" />
              </div>
              <select
                name="regency"
                value={selectedRegency}
                onChange={(e) => onRegencyChange(e.target.value)}
                disabled={!selectedProvince}
                className="w-full pl-9 pr-8 py-2.5 text-sm font-medium bg-slate-100 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 cursor-pointer hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {regencies.map((r: any) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ComboboxIcon type="arrow" />
              </div>
            </div>
          </div>

          {/* Kecamatan */}
          <div>
            <label className="block text-[10px] font-700 tracking-widest text-gray-400 uppercase mb-2">
              Kecamatan
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <ComboboxIcon type="district" />
              </div>
              <select
                name="district"
                value={selectedDistrict}
                onChange={(e) => onDistrictChange(e.target.value)}
                disabled={!selectedRegency}
                className="w-full pl-9 pr-8 py-2.5 text-sm font-medium bg-slate-100 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 cursor-pointer hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
              >
                <option value="">Pilih Kecamatan</option>
                {districts.map((d: any) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ComboboxIcon type="arrow" />
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium border-2 border-blue-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-400 active:scale-95 transition-all duration-150"
          >
            <ComboboxIcon type="reset" />
            Reset
          </button>
        </div>        
      </div>
    </aside>
  )
}
