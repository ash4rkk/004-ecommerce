import React from 'react'
import { Title } from '../ui/text';
import { DATA_PRICE_RANGE_ARRAY } from '@/constants/data';
import { RadioGroup ,RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { motion } from 'motion/react'
interface Props {
  selectedPrice?: string | null;
  setSelectedPrice?: React.Dispatch<React.SetStateAction<string | null>>;
}
const priceArray = DATA_PRICE_RANGE_ARRAY
const PriceList = ({selectedPrice, setSelectedPrice}: Props) => {
  return (
    <div className="w-full p-2">
      <Title className="text-base font-semibold text-black">
        Price
      </Title>
      <RadioGroup value={selectedPrice || ''} className="mt-2 space-y-1">
        {priceArray?.map((price, index) => (
          <div
            onClick={() => {
              setSelectedPrice?.(price.value);
            }}
            key={index}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-md"
            />
            <Label
              htmlFor={price?.value}
              className='cursor-pointer'
              // className={`${selectedCategory === category?.slug?.current ? "text-shop_dark_green font-semibold" : "font-normal"}`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
          <motion.button
            animate={{ opacity: selectedPrice ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPrice?.(null)}
            className={`hover:text-shop_dark_green hoverEffect mt-2 text-sm font-medium underline decoration-1 underline-offset-2 ${!selectedPrice && "invisible"}`}
          >
            Reset Selection
          </motion.button>
        
      </RadioGroup>
    </div>  )
}

export default PriceList