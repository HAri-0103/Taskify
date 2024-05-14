'use client'
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectionProps = {
    fieldChange: (string:String) => void;
    prior?: string;
}
export function Selection({fieldChange,prior}: SelectionProps) {
    const [value, setValue] = React.useState("")
  return (
    <Select onValueChange={(value)=>{
      setValue(value)
      fieldChange(value)
      }}>
    <SelectTrigger className="w-[180px]">
      {prior?<SelectValue placeholder={prior}/>:<SelectValue placeholder="Select Priority"/>}
    </SelectTrigger>
    <SelectContent className="bg-black text-white">
      <SelectGroup className="">
        <SelectItem className="bg-white text-black" value="Important">Important</SelectItem>
        <SelectItem className="bg-white text-black" value="Not Important">Not Important</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}
export default Selection
