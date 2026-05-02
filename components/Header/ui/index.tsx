import { NavItems } from '@/components/NavItems';
import { UserDropdown } from '@/components/UserDropdown';
import Image from 'next/image';
import Link from 'next/link';
export const Header = () => {
	return (
		<header className="sticky top-0 header">
			<div className="container header-wrapper">
				<Link href="/">
					<Image
						loading="eager"
						src="/assets/icons/logo.svg"
						alt="logo"
						width={140}
						height={32}
						className="w-auto h-8 cursor-pointer"
					/>
				</Link>
				<nav className="hidden sm:block">
					<NavItems />
				</nav>
				<UserDropdown />
			</div>
		</header>
	);
};
