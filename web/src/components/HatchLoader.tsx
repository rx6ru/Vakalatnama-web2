"use client";

import { Hatch } from 'ldrs/react'
import 'ldrs/react/Hatch.css'

export default function HatchLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black">
      <Hatch
        size="50"
        stroke="4"
        speed="2"
        color="white"
      />
    </div>
  )
}
