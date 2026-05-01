'use client';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, LogOut } from 'lucide-react';
import { NavItems } from '@/components/NavItems';

export const UserDropdown = () => {
	const router = useRouter();

	const handleSignOut = async () => {
		router.push('/sign-in');
	};

	const user = {
		name: 'John Doe',
		email: 'john.doe@example.com',
		image: 'https://github.com/shadcn.png',
	};
	const initials = user.name
		.split(' ')
		.map((name) => name.charAt(0))
		.join('');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='flex items-center gap-2 text-gray-400 hover:text-yellow-500 cursor-pointer'>
					<Avatar className='size-8'>
						<AvatarImage src={user.image} />
						<AvatarFallback className='bg-yellow-500 text-yellow-900 text-sm font-bold'>{initials}</AvatarFallback>
					</Avatar>
					<div className='hidden md:flex flex-col items-start'>
						<span className='text-base font-medium text-gray-4 max-w-40 truncate'>{user.name}</span>
					</div>
					<ChevronDown className='size-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='text-gray-400 w-fit min-w-52 max-w-60'>
				<DropdownMenuGroup>
					<DropdownMenuLabel>
						<div className='flex relative items-center gap-2 py-2'>
							<Avatar className='size-10'>
								<AvatarImage src={user.image} />
								<AvatarFallback className='bg-yellow-500 text-yellow-900 text-sm font-bold'>{initials}</AvatarFallback>
							</Avatar>
							<div className='flex flex-col min-w-0'>
								<span className='text-base font-medium text-gray-4 00 truncate'>{user.name}</span>
								<span className='text-sm text-gray-500 truncate'>{user.email}</span>
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className='bg-gray-600' />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={handleSignOut}
						className='text-gray-100 font-medium focus:bg-transparent focus:text-yellow-500 focus:**:text-yellow-500! cursor-pointer pl-2'
					>
						<LogOut className='h-4 w-4 mr-1 hidden sm:block' />
						Logout
					</DropdownMenuItem>
					<DropdownMenuSeparator className='hidden 2lg:block bg-gray-600' />
					<nav className='sm:hidden'>
						<NavItems />
					</nav>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
