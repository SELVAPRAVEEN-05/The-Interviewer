'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

// import { Popover, PopoverContent } from '@nextui-org/popover';

interface ContentItem {
	label: any;
	value: any;
}

interface IndexProps {
	id?: string;
	content?: Array<string | ContentItem>;
	isOpen?: boolean;
	handleClick?: (label: string) => void;
	onClose?: () => void;
	placement?: string;
	trigger?: React.ReactNode;
	profileCard?: boolean;
	children?: any;
	LabelId?: string;
}

export const PopOver = ({
	id,
	isOpen = false,
	trigger,
	handleClick = () => false,
	onClose = () => false,
	content = [],
	placement = 'left-start',
	profileCard = false,
	children,
	LabelId,
}: IndexProps) => {
	return (
		<Popover isOpen={isOpen} onClose={onClose} placement={placement as any}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent
				className='border border-background-500 items-start gap-4 shadow-none py-4 px-3 bg-background-50 rounded-borderRadius12px'
				id={id}
			>
				{profileCard ? (
					<>{children}</>
				) : (
					<>
						{content?.map((item: string | ContentItem, index: number) => {
							// Determine the label and value
							const label = typeof item === 'string' ? item : item?.label;
							const value = typeof item === 'string' ? item : item?.value;

							return (
								<div
									id={`${LabelId}-${index}`}
									key={index}
									className='flex items-center cursor-pointer justify-start text-left text-body2 font-regular text-background-900'
									onClick={() => {
										handleClick(label);
										onClose();
									}}
								>
									{label}
								</div>
							);
						})}
					</>
				)}
			</PopoverContent>
		</Popover>
	);
};
