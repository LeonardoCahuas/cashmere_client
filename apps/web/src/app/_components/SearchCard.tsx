type VehicleType = 'car' | 'motorbike' | 'van'
type RentalTerm = 'short' | 'long'

const TermSelector = () => (
  <div className="flex flex-col">
    <div className="font-medium mb-2">Rental Term</div>
    <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
      <label className="flex-1">
        <input type="radio" name="term" value="short" defaultChecked className="hidden peer" />
        <div className="px-4 py-2 rounded-full text-center peer-checked:bg-white peer-checked:shadow-sm cursor-pointer">
          Short term
        </div>
      </label>
      <label className="flex-1">
        <input type="radio" name="term" value="long" className="hidden peer" />
        <div className="px-4 py-2 rounded-full text-center peer-checked:bg-white peer-checked:shadow-sm cursor-pointer">
          Long term
        </div>
      </label>
    </div>
  </div>
)

const VehicleTypeSelector = () => (
  <div className="flex flex-col">
    <div className="font-medium mb-2">Vehicle Type</div>
    <div className="flex gap-2">
      <label>
        <input type="radio" name="type" value="car" defaultChecked className="hidden peer" />
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-100">
          <span>Car</span>
        </div>
      </label>
      <label>
        <input type="radio" name="type" value="motorbike" className="hidden peer" />
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-100">
          <span>Motorbike</span>
        </div>
      </label>
      <label>
        <input type="radio" name="type" value="van" className="hidden peer" />
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-100">
          <span>Van</span>
        </div>
      </label>
    </div>
  </div>
)

const SearchInput = ({
  label,
  placeholder,
  name,
}: {
  label: string
  placeholder: string
  name: string
}) => (
  <div className="flex flex-col">
    <div className="font-medium mb-2">{label}</div>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      className="px-4 py-2 rounded-lg border bg-gray-50 focus:outline-siva-primary-green"
    />
  </div>
)

const PriceSelector = () => (
  <div className="flex flex-col h-[42px]">
    <div className="font-medium mb-2">Daily Price (up to)</div>
    <select
      name="price"
      className="px-4 py-2 rounded-lg border bg-gray-50 focus:outline-siva-primary-green"
    >
      <option value="">Select price range</option>
      <option value="50">Up to €50</option>
      <option value="100">Up to €100</option>
      <option value="150">Up to €150</option>
      <option value="200">Up to €200</option>
      <option value="250">Up to €250+</option>
    </select>
  </div>
)

export const SearchCard = () => {
  return (
    <div className="w-full h-fit flex justify-center pt-16">
      <div className="w-fit h-fit flex flex-col bg-white p-8 shadow-big rounded-3xl">
        <form action="/search" className="flex flex-col space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <TermSelector />
            <VehicleTypeSelector />
            <SearchInput label="Position" placeholder="Enter location" name="position" />
            <SearchInput label="Brand" placeholder="Select brand" name="brand" />
            <SearchInput label="Model" placeholder="Select model" name="model" />
            <PriceSelector />
          </div>

          <button
            type="submit"
            className="w-full bg-siva-primary-green text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
          >
            <SearchIcon />
            <span>Show 34,000 results</span>
          </button>
        </form>
      </div>
    </div>
  )
}

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
