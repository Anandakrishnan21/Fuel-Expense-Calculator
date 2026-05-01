import FuelIcon from "../icons/FuelIcon"

function Header() {
  return (
    <header className="flex flex-row gap-2">
      <FuelIcon />
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Fuel Expense Calculator</h4>
    </header>
  )
}

export default Header
