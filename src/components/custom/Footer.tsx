import IndianRupeeIcon from "../icons/IndianRupeeIcon"

function Footer({
  totalFuel,
  totalTripCost,
  avgCostPerPerson,
}: {
  totalFuel: number
  totalTripCost: number
  avgCostPerPerson: number
}) {
  return (
    <div className="fixed right-4 bottom-4 left-4 flex flex-row justify-between rounded-lg bg-[#1E3A8A] p-3 text-white">
      <div>
        <small className="text-sm leading-none font-medium">Total Fuel</small>
        <p>{totalFuel.toFixed(2)} L</p>
      </div>
      <div>
        <small className="text-sm leading-none font-medium">Total Cost</small>
        <p className="flex flex-row items-center gap-1">
          <IndianRupeeIcon />
          {totalTripCost.toFixed(2)}
        </p>
      </div>
      <div>
        <small className="text-sm leading-none font-medium">
          Avg Cost/Person
        </small>
        <p className="flex flex-row items-center gap-1">
          <IndianRupeeIcon />
          {avgCostPerPerson.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default Footer
