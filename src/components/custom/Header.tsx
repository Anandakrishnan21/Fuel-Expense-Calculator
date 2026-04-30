import FuelIcon from "../icons/FuelIcon"

function Header() {
  return (
    <header className="flex flex-row gap-2">
      <FuelIcon />
      <h2 className="text-lg font-bold">Fuel Expense Calculator</h2>
    </header>
  )
}

export default Header
