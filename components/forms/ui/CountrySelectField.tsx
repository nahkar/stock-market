import type { FocusEvent as ReactFocusEvent } from 'react';

import { Label } from '@/components/ui/label';

import { CountryDropdown } from '@/components/ui/country-dropdown';
import { Controller } from 'react-hook-form';

/** Radix portal popover wrapper — skipping RHF blur here avoids validating on focus move into list */
const RADIX_POPOVER_CONTENT_SELECTOR = '[data-slot="popover-content"]';

function isInsidePopoverContent(el: HTMLElement | null) {
	return Boolean(el?.closest(RADIX_POPOVER_CONTENT_SELECTOR));
}

function handleCountryDropdownBlur(
	event: ReactFocusEvent<HTMLButtonElement>,
	notifyFieldBlur: () => void
) {
	if (event.relatedTarget instanceof HTMLElement && isInsidePopoverContent(event.relatedTarget)) {
		return;
	}

	queueMicrotask(() => {
		if (
			document.activeElement instanceof HTMLElement &&
			isInsidePopoverContent(document.activeElement)
		) {
			return;
		}
		notifyFieldBlur();
	});
}

export const CountrySelectField = ({
	name,
	label,
	control,
	error,
	required,
}: CountrySelectProps) => {
	return (
		<div className="space-y-2">
			<Label htmlFor={name} className="form-label">
				{label}
			</Label>
			<Controller
				name={name}
				control={control}
				rules={{ required: required ? `Please select ${label.toLowerCase()}` : false }}
				render={({ field }) => (
					<CountryDropdown
						placeholder="Select country"
						defaultValue={field.value || undefined}
						onChange={(country) => field.onChange(country.alpha3)}
						onBlur={(e) => handleCountryDropdownBlur(e, field.onBlur)}
						ref={field.ref}
					/>
				)}
			/>

			{error && <p className="text-red-500 text-sm">{error.message}</p>}
		</div>
	);
};
