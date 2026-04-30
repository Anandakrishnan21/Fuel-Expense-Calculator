import React, { useEffect } from "react"
import MinusIcon from "./components/icons/MinusIcon"
import PlusIcon from "./components/icons/PlusIcon"
import { Button } from "./components/ui/button"
import { Field, FieldLabel } from "./components/ui/field"
import { Input } from "./components/ui/input"
import { Slider } from "./components/ui/slider"
import CalculatorIcon from "./components/icons/CalculatorIcon"
import ArrowRight from "./components/icons/ArrowRightIcon"
import ArrowRightIcon from "./components/icons/ArrowRightIcon"
import FuelIcon from "./components/icons/FuelIcon"

export function App() {
  const [mileage, setMileage] = React.useState("")
  const [kilometers, setKilometers] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [persons, setPersons] = React.useState("")
  const [totalFuel, setTotalFuel] = React.useState(0)
  const [totalTripCost, setTotalTripCost] = React.useState(0)
  const [avgCostPerPerson, setAvgCostPerPerson] = React.useState(0)
  const [advancedOption, setAdvancedOption] = React.useState(false)
  const [personDistances, setPersonDistances] = React.useState<string[]>([])
  const [personAmounts, setPersonAmounts] = React.useState<number[]>([])

  const handleAdvancedOptions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setAdvancedOption((prev) => !prev)
  }

  const handlePlus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setPersons((prev) => (prev ? String(Number(prev) + 1) : "1"))
  }

  const handleMinus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setPersons((prev) => {
      const current = Number(prev || "0")
      if (current <= 0) return "0"
      return String(current - 1)
    })
  }

  const handleCalculate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    const totalCost = (Number(kilometers) / Number(mileage)) * Number(price)
    const totalFuel = Number(kilometers) / Number(mileage)
    const avgCost = totalCost / Number(persons || "1")

    setTotalTripCost(totalCost || 0)
    setTotalFuel(totalFuel || 0)
    setAvgCostPerPerson(avgCost || 0)

    if (advancedOption && personDistances.length > 0) {
      const totalDistance = personDistances.reduce((sum, distance) => {
        return sum + Number(distance || 0)
      }, 0)

      if (totalDistance === 0) return

      const calculatedAmounts = personDistances.map((distance) => {
        const ratio = Number(distance || 0) / totalDistance
        return ratio * totalCost
      })

      setPersonAmounts(calculatedAmounts)
    }
  }

  return (
    <div className="flex h-screen w-full flex-col gap-2 bg-[#F0FDF4] p-3">
      <header className="flex flex-row gap-2">
        <FuelIcon />
        <h2 className="text-xl font-bold">Fuel Expense Calculator</h2>
      </header>
      <div className="flex flex-col gap-2 rounded-lg bg-white p-3 drop-shadow-md">
        <div>
          <Field>
            <FieldLabel htmlFor="mileage">Mileage Km/L</FieldLabel>
            <Input
              id="mileage"
              type="text"
              placeholder="00.00"
              value={mileage}
            />
            <Slider
              defaultValue={[mileage ? Number(mileage) : 0]}
              max={100}
              step={1}
              onValueChange={(value) => setMileage(String(value[0]))}
              className="w-full data-[slot=slider]:mt-1"
            />
          </Field>
        </div>
        <div>
          <Field>
            <FieldLabel htmlFor="kilometers">Total Kilometers</FieldLabel>
            <Input
              id="kilometers"
              type="text"
              placeholder="00.00"
              value={kilometers}
              onChange={(e) => setKilometers(e.target.value)}
            />
          </Field>
        </div>
        <div className="flex flex-row gap-2">
          <Field>
            <FieldLabel htmlFor="price">Fuel Price (per litre)</FieldLabel>
            <Input
              id="price"
              type="text"
              placeholder="00.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="persons">No of Persons</FieldLabel>
            <div className="flex flex-row items-center justify-center">
              <Button
                className="flex h-full items-center justify-center rounded-l-md rounded-r-none bg-[#0D9488] p-1 text-white"
                onClick={(e) => handleMinus(e)}
              >
                <MinusIcon />
              </Button>
              <Input
                id="persons"
                type="text"
                placeholder="0"
                className="flex flex-col items-center justify-center border-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
              />
              <Button
                className="flex h-full items-center justify-center rounded-l-none rounded-r-md bg-[#0D9488] p-1 text-white"
                onClick={(e) => handlePlus(e)}
              >
                <PlusIcon />
              </Button>
            </div>
          </Field>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button className="bg-[#0D9488] text-white" onClick={handleCalculate}>
          <div className="flex flex-row items-center justify-center gap-1">
            <CalculatorIcon />
            <p>Calculate</p>
          </div>
        </Button>
        <Button
          className="border-2 border-[#0D9488] text-[#0D9488]"
          onClick={(e) => handleAdvancedOptions(e)}
        >
          <div className="flex flex-row items-center justify-center gap-1">
            <ArrowRightIcon />
            <p>Advance Options</p>
          </div>
        </Button>
      </div>
      <div
        className={`${
          advancedOption && Number(persons) > 0
            ? "flex flex-col gap-2 rounded-lg bg-white p-3 drop-shadow-md"
            : "hidden"
        }`}
      >
        {advancedOption &&
          Number(persons) > 0 &&
          Array.from({ length: Number(persons) }, (_, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-2"
            >
              <p className="text-sm">Person {index + 1}</p>

              <Input
                type="text"
                placeholder="Distance"
                value={personDistances[index] || ""}
                onChange={(e) => {
                  const updated = [...personDistances]
                  updated[index] = e.target.value
                  setPersonDistances(updated)
                }}
              />

              <p>
                Amount: $
                {personAmounts[index]
                  ? personAmounts[index].toFixed(2)
                  : "0.00"}
              </p>
            </div>
          ))}
      </div>
      <div className="fixed right-4 bottom-4 left-4 flex flex-row justify-between rounded-lg bg-[#1E3A8A] p-3 text-white">
        <div>
          <h3 className="text-sm">Total Fuel</h3>
          <p>{totalFuel.toFixed(2)} L</p>
        </div>
        <div>
          <h3 className="text-sm">Total Trip Cost</h3>
          <p>$ {totalTripCost.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-sm">Avg Cost/Person</h3>
          <p>$ {avgCostPerPerson.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default App
