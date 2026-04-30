import React from "react"
import { Field, FieldLabel } from "../ui/field"
import IndianRupeeIcon from "../icons/IndianRupeeIcon"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import CalculatorIcon from "../icons/CalculatorIcon"
import ArrowRightIcon from "../icons/ArrowRightIcon"
import PlusIcon from "../icons/PlusIcon"
import MinusIcon from "../icons/MinusIcon"
import { Slider } from "@radix-ui/react-slider"
import Header from "./Header"
import Footer from "./Footer"

function CalculatorScreen() {
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
    <>
      <Header />
      <div className="flex flex-col gap-2 rounded-lg bg-white p-3 drop-shadow-md">
        <div>
          <Field>
            <FieldLabel htmlFor="mileage">Mileage Km/L</FieldLabel>
            <Input
              id="mileage"
              type="text"
              placeholder="0 Km/L"
              value={mileage}
              disabled
            />
            <Slider
              defaultValue={[mileage ? Number(mileage) : 0]}
              max={100}
              step={1}
              onValueChange={(value) => setMileage(String(value[0]))}
              aria-label="slider"
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
              placeholder="0 Km"
              value={kilometers}
              onChange={(e) => {
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                  setKilometers(e.target.value)
                }
              }}
            />
          </Field>
        </div>
        <div className="flex flex-row gap-2">
          <Field className="flex flex-col justify-between">
            <FieldLabel htmlFor="price">Fuel Price (per litre)</FieldLabel>
            <Input
              id="price"
              type="text"
              placeholder="0 L"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Field>
          <Field className="flex flex-col justify-between">
            <FieldLabel htmlFor="persons">No of Persons</FieldLabel>
            <div className="flex flex-row items-center justify-center">
              <Button
                name="minusButton"
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
                disabled
                onChange={(e) => {
                  setPersons(e.target.value)
                }}
              />
              <Button
                name="plusButton"
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
          className="border-2 border-[#0F766E] text-[#0F766E]"
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
            ? "flex flex-col gap-3 rounded-lg bg-white p-4 shadow-md"
            : "hidden"
        }`}
      >
        <FieldLabel htmlFor="individualBreakdown">
          Individual Breakdown
        </FieldLabel>
        {Array.from({ length: Number(persons) }, (_, index) => (
          <div key={index} className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm font-medium">Person {index + 1}</p>

            <Input
              type="text"
              placeholder="Distance"
              value={personDistances[index] || ""}
              className="w-full max-w-[140px]"
              onChange={(e) => {
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                  const updated = [...personDistances]
                  updated[index] = e.target.value
                  setPersonDistances(updated)
                }
              }}
            />

            <p className="flex items-center justify-end gap-1 text-sm font-medium">
              <IndianRupeeIcon />
              <span>
                {personAmounts[index]
                  ? personAmounts[index].toFixed(2)
                  : "0.00"}
              </span>
            </p>
          </div>
        ))}
      </div>
      <Footer
        totalFuel={totalFuel}
        totalTripCost={totalTripCost}
        avgCostPerPerson={avgCostPerPerson}
      />
    </>
  )
}

export default CalculatorScreen
