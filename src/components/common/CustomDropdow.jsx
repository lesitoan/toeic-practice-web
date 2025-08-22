import React, { use, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CustomDropdown = ({ items, value, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="flex items-center justify-between bg-blue-200 text-md font-medium px-4 py-2 rounded-lg text-textBlackColor min-w-[150px]"
          variant="bordered"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value ? `${value}` : `${items[0]}`}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 ml-2" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2" />
          )}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        disallowEmptySelection
        aria-label="Category selection"
        selectionMode="single"
        selectedKeys={value ? new Set([value]) : new Set()}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0];
          onSelect(selected);
          setIsOpen(false);
        }}
        className="bg-blue-200 shadow-lg rounded-lg p-2 !border-0 !outline-none"
      >
        {items.map((item) => (
          <DropdownItem
            key={item}
            value={item}
            className="!hover:bg-blue-500 px-3 py-2 rounded-md cursor-pointer text-textBlackColor"
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropdown;
