'use client';
import React, { useCallback, useMemo, useState, forwardRef } from 'react';

// shadcn
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// utils
import { cn } from '@/lib/utils';

// assets
import { ChevronDown, CheckIcon, Globe } from 'lucide-react';
import { CircleFlag } from 'react-circle-flags';

// data
import { countries } from 'country-data-list';

// Country interface
export interface Country {
	alpha2: string;
	alpha3: string;
	countryCallingCodes: string[];
	currencies: string[];
	emoji?: string;
	ioc: string;
	languages: string[];
	name: string;
	status: string;
}

// Dropdown props
interface CountryDropdownProps extends Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	'onChange'
> {
	options?: Country[];
	onChange?: (country: Country) => void;
	defaultValue?: string;
	disabled?: boolean;
	placeholder?: string;
	slim?: boolean;
}

const CountryDropdownComponent = (
	{
		options = countries.all.filter(
			(country: Country) => country.emoji && country.status !== 'deleted' && country.ioc !== 'PRK'
		),
		onChange,
		defaultValue,
		disabled = false,
		placeholder = 'Select a country',
		slim = false,
		className: triggerClassName,
		...props
	}: CountryDropdownProps,
	ref: React.ForwardedRef<HTMLButtonElement>
) => {
	const [open, setOpen] = useState(false);

	const derivedCountry = useMemo(() => {
		if (!defaultValue) return undefined;
		return options.find((country) => country.alpha3 === defaultValue);
	}, [defaultValue, options]);

	const [lastDefaultValue, setLastDefaultValue] = useState(defaultValue);
	const [userSelection, setUserSelection] = useState<Country | null>(null);

	if (defaultValue !== lastDefaultValue) {
		setLastDefaultValue(defaultValue);
		setUserSelection(null);
	}

	const selectedCountry = userSelection ?? derivedCountry ?? undefined;

	const handleSelect = useCallback(
		(country: Country) => {
			setUserSelection(country);
			onChange?.(country);
			setOpen(false);
		},
		[onChange]
	);

	const triggerClasses = cn(
		'select-trigger flex items-center justify-between gap-1.5 whitespace-nowrap',
		slim === true && 'w-20'
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				ref={ref}
				className={cn(triggerClasses, triggerClassName)}
				disabled={disabled}
				{...props}
			>
				{selectedCountry ? (
					<div className="flex grow w-0 items-center gap-2 overflow-hidden">
						<div className="inline-flex size-[22px] shrink-0 items-center justify-center overflow-hidden rounded-full">
							<CircleFlag countryCode={selectedCountry.alpha2.toLowerCase()} height={22} />
						</div>
						{slim === false && (
							<span className="overflow-hidden text-ellipsis whitespace-nowrap">
								{selectedCountry.name}
							</span>
						)}
					</div>
				) : (
					<span className={cn('truncate', slim === false ? 'text-gray-500' : 'text-gray-400')}>
						{slim === false ? placeholder : <Globe className="size-5 shrink-0" />}
					</span>
				)}
				<ChevronDown className="size-4 shrink-0 pointer-events-none text-gray-400" aria-hidden />
			</PopoverTrigger>
			<PopoverContent
				collisionPadding={10}
				side="bottom"
				align="start"
				className={cn(
					'w-(--radix-popper-anchor-width) min-w-(--radix-popper-anchor-width) max-w-(--radix-popper-anchor-width) gap-0! overflow-hidden p-0',
					'rounded-xl border border-gray-700 bg-black! text-white shadow-lg shadow-black/50'
				)}
			>
				<Command className="flex max-h-[min(280px,50vh)] w-full flex-col overflow-hidden rounded-none border-0 bg-black! p-0 text-white">
					<CommandList className="max-h-[min(280px,50vh)] bg-black">
						<div className="sticky top-0 z-10 border-b border-gray-700 bg-black px-3 pt-3 pb-3">
							<CommandInput
								placeholder="Search country..."
								wrapperClassName="p-0"
								groupClassName="h-10! rounded-lg border border-gray-700 bg-black! shadow-none! dark:bg-black! has-[[data-slot=command-input]:focus-visible]:border-gray-600 has-[[data-slot=command-input]:focus-visible]:ring-0!"
								className="bg-transparent text-sm text-gray-400 placeholder:text-gray-500"
							/>
						</div>
						<CommandEmpty className="bg-black px-3 py-8 text-center text-sm text-gray-500">
							No country found.
						</CommandEmpty>
						<CommandGroup className="bg-black px-2 py-2 text-white">
							{options
								.filter((x) => x.name)
								.map((option, key: number) => {
									const isChosen = option.alpha3 === selectedCountry?.alpha3;
									return (
										<CommandItem
											className={cn(
												'relative mb-1 flex cursor-pointer items-center gap-3 rounded-lg! border-0 bg-transparent px-3 py-2 pr-11 text-[15px] leading-snug tracking-tight text-white shadow-none outline-none ring-0',
												'transition-colors duration-150 ease-out',
												'hover:bg-neutral-900 hover:text-white',
												'aria-selected:bg-neutral-900!',
												isChosen && 'bg-neutral-900',
												'data-[disabled=true]:pointer-events-none',
												'[&>svg:last-child]:hidden'
											)}
											key={key}
											onSelect={() => handleSelect(option)}
										>
											<div className="inline-flex size-[22px] shrink-0 items-center justify-center overflow-hidden rounded-full">
												<CircleFlag countryCode={option.alpha2.toLowerCase()} height={22} />
											</div>
											<span className="min-w-0 flex-1 truncate font-normal">{option.name}</span>
											<CheckIcon
												className={cn(
													'pointer-events-none absolute right-3 size-[18px] shrink-0 text-white',
													isChosen ? 'opacity-100' : 'opacity-0'
												)}
												strokeWidth={2.25}
												aria-hidden
											/>
										</CommandItem>
									);
								})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

CountryDropdownComponent.displayName = 'CountryDropdownComponent';

export const CountryDropdown = forwardRef(CountryDropdownComponent);
